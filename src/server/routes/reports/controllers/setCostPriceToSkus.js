var calc = require("../services/calcServices");
var { connection } = require("../../../database");
var processOfSkuCostPriceSetting = require("../services/different/processOfSkuCostPriceSetting");

var setCostPriceToSkus = async (req, res, next) => {
  var { userId, reportId, taxYear, costPrices } = req.body;
  var { saveUpdatedReport, getReportById } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var skusDataToClient = [];
  var session = await connection.startSession();

  try {
    await session.withTransaction(async () => {
      var taxParams;
      var { report } = await getReportById(userId, reportId);
      var { skus, ...totalParams } = report;

      if (report.crossesTaxYears) {
        var startYear = +report.dateFrom.split("-")[0];
        var endYear = +report.dateTo.split("-")[0];
        var allTaxParams = await getTaxParamsFromDb(userId, (year = null), session);
        taxParams.startYearTaxParams = allTaxParams.find((param) => param.year == startYear);
        taxParams.endYearTaxParams = allTaxParams.find((param) => param.year == endYear);
      } else {
        taxParams = await getTaxParamsFromDb(userId, taxYear);
      }

      for (var { id, lastCostPrice } of costPrices) {
        var skuIndex = skus.findIndex((sku) => sku.id === id);

        if (skus[skuIndex].costPrice === lastCostPrice) {
          continue;
        }

        skus[skuIndex].costPrice = lastCostPrice;

        if (report.crossesTaxYears) {
          var result = await processOfSkuCostPriceSetting(skus[skuIndex], taxParams, report.crossesTaxYears);

          skus[skuIndex] = result.updatedSku;
          taxParams = result.taxParams;
        } else {
          var result = await processOfSkuCostPriceSetting(skus[skuIndex], taxParams, report.crossesTaxYears);
          skus[skuIndex] = result.updatedSku;
          taxParams = result.taxParams;
        }

        var { profitMargin, finalProfit } = skus[skuIndex];

        skusDataToClient.push({
          skuIndex,
          data: { profitMargin, finalProfit, costprice: lastCostPrice },
        });
      }

      if (!skusDataToClient.length) {
        return res.sendStatus(409);
      }

      if (report.crossesTaxYears) {
        var { startYearTaxParams, endYearTaxParams } = taxParams;
        await changeTaxParamsToDb(userId, startYear, session, startYearTaxParams);
        await changeTaxParamsToDb(userId, endYear, session, endYearTaxParams);
      } else {
        await changeTaxParamsToDb(userId, taxYear, session, taxParams);
      }

      var updatedReport = await calc.total.restParams(totalParams, skus, report.crossesTaxYears);

      await saveUpdatedReport(userId, reportId, updatedReport, session);

      res.json({
        skusDataToClient,
        total: { totalFinalProfit: totalParams.totalFinalProfit, totalProfitMargin: totalParams.totalProfitMargin },
      });
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

module.exports = setCostPriceToSkus;
