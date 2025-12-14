var calc = require("../services/calcServices");
var { connection } = require("../../../database");
var setCostPriceToSkuBySkuIndex = require("../services/different/setCostPriceToSkuBySkuIndex");
var processOfSkuCostPriceSetting = require("../services/different/processOfSkuCostPriceSetting");

var setCostPriceToSkus = async (req, res, next) => {
  var { userId, reportId, taxYear, costPrices } = req.body;
  var { saveUpdatedReport, getReportById } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var session = await connection.startSession();

  var total = {};
  var skusDataToClient = [];

  try {
    await session.withTransaction(async () => {
      var taxParams;
      var { report } = await getReportById(userId, reportId);
      var { skus, ...totalParams } = report;

      if (report.crossesTaxYears) {
        var startYear = +report.dateFrom.split("-")[0];
        var endYear = +report.dateTo.split("-")[0];
        var startYearTaxParams = await getTaxParamsFromDb(userId, startYear, session);
        var endYearTaxParams = await getTaxParamsFromDb(userId, endYear, session);
        taxParams = { startYearTaxParams, endYearTaxParams };
      } else {
        taxParams = await getTaxParamsFromDb(userId, taxYear);
      }

      for (var { id, lastCostPrice } of costPrices) {
        var skuIndex = skus.findIndex((sku) => sku.id === id);

        var { updatedSKUS, updatedSKU } = setCostPriceToSkuBySkuIndex(
          skus,
          skuIndex,
          lastCostPrice
        );

        if (report.crossesTaxYears) {
          var result = await processOfSkuCostPriceSetting(updatedSKU, taxParams, report.crossesTaxYears);
          console.log(result.updatedSku)
          updatedSKUS[skuIndex] = result.updatedSku;
          taxParams = result.taxParams;
        } else {
          var result = await processOfSkuCostPriceSetting(updatedSKU, taxParams, report.crossesTaxYears);
          updatedSKUS[skuIndex] = result.updatedSku;
          taxParams = result.taxParams;
        }

        var { profitMargin, finalProfit } = result.updatedSku;

        skusDataToClient.push({
          skuIndex,
          data: { profitMargin, finalProfit, costprice: lastCostPrice },
        });
      }

      if (report.crossesTaxYears) {
        var { startYearTaxParams, endYearTaxParams } = taxParams;
        await changeTaxParamsToDb(userId, startYear, session, startYearTaxParams);
        await changeTaxParamsToDb(userId, endYear, session, endYearTaxParams);
      } else {
        await changeTaxParamsToDb(userId, taxYear, session, taxParams);
      }

      var updatedReport = await calc.total.restParams(totalParams, updatedSKUS, report.crossesTaxYears);

      await saveUpdatedReport(userId, reportId, updatedReport, session);

      var { totalFinalProfit, totalProfitMargin } = updatedReport;
      total = { totalFinalProfit, totalProfitMargin };
    });

    return res.json({ skusDataToClient, total });
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
