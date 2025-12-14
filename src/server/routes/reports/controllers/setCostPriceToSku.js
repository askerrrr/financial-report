var calc = require("../services/calcServices");
var { connection } = require("../../../database");
var setCostPriceToSkuBySkuIndex = require("../services/different/setCostPriceToSkuBySkuIndex");
var processOfSkuCostPriceSetting = require("../services/different/processOfSkuCostPriceSetting");

var setCostPriceToSku = async (req, res, next) => {
  var { userId, reportId, skuIndex, costPrice, skuId, year } = req.body;
  var { updateSkuLastCostPrice } = req.app.locals.goodsCollectionServices;
  var { saveUpdatedReport, getReportById } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var session = await connection.startSession();

  try {
    await session.withTransaction(async () => {
      var { report } = await getReportById(userId, reportId, session);
      var { skus, ...totalParams } = report;
      var { updatedSKUS, updatedSKU } = setCostPriceToSkuBySkuIndex(skus, skuIndex, costPrice);

      if (report.crossesTaxYears) {
        var startYear = +report.dateFrom.split("-")[0];
        var endYear = +report.dateTo.split("-")[0];
        var startYearTaxParams = await getTaxParamsFromDb(userId, startYear, session);
        var endYearTaxParams = await getTaxParamsFromDb(userId, endYear, session);
        var taxParams = { startYearTaxParams, endYearTaxParams };

        var result = await processOfSkuCostPriceSetting(updatedSKU, taxParams, report.crossesTaxYears);
        updatedSKU = result.updatedSku;

        var { startYearTaxParams, endYearTaxParams } = result.taxParams;
        await changeTaxParamsToDb(userId, startYear, session, startYearTaxParams);
        await changeTaxParamsToDb(userId, endYear, session, endYearTaxParams);
      } else {
        var taxParams = await getTaxParamsFromDb(userId, year, session);
        var result = await processOfSkuCostPriceSetting(updatedSKU, taxParams);

        updatedSKU = result.updatedSku;
        await changeTaxParamsToDb(userId, year, session, result.taxParams);
      }

      updatedSKUS[skuIndex] = updatedSKU;

      var updatedReport = await calc.total.restParams(totalParams, updatedSKUS, report.crossesTaxYears);

      await saveUpdatedReport(userId, reportId, updatedReport, session);
      await updateSkuLastCostPrice(userId, skuId, costPrice, session);
      var { totalFinalProfit, totalProfitMargin } = updatedReport;
      var { profitMargin, finalProfit } = updatedSKU;

      res.json({
        sku: {
          skuIndex,
          data: {
            profitMargin,
            finalProfit,
          },
        },
        total: { totalFinalProfit, totalProfitMargin },
      });
    });
  } catch (err) {
    console.log({ err });
    //log error
    return res.sendStatus(304);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

module.exports = setCostPriceToSku;
