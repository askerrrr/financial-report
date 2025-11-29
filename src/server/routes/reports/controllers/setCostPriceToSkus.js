var calc = require("../services/calcServices");
var { connection } = require("../../../database");
var setCostPriceToSkuBySkuIndex = require("../services/different/setCostPriceToSkuBySkuIndex");

var setCostPriceToSkus = async (req, res, next) => {
  var { userId, reportId, taxYear, costPrices } = req.body;
  var { saveUpdatedReport, getReportById } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var session = await connection.startSession();

  var total = {};
  var skusDataToClient = [];
  var totalPaidInsuranceFee = 0;

  try {
    await session.withTransaction(async () => {
      var taxParams = await getTaxParamsFromDb(userId, taxYear);
      var { report } = await getReportById(userId, reportId);
      var { skus, ...totalParams } = report;

      for (var { id, lastCostPrice } of costPrices) {
        var skuIndex = skus.findIndex((sku) => sku.id === id);

        var { updatedSKUS, updatedSKU } = setCostPriceToSkuBySkuIndex(skus, skuIndex, lastCostPrice);
        var { skuWithCalculatedParams, insuranceFeePercentage, recalculatedPaidInsuranceFee } = calc.sku.restParams(updatedSKU, taxParams);
        totalPaidInsuranceFee += recalculatedPaidInsuranceFee;

        updatedSKUS[skuIndex] = skuWithCalculatedParams;
        var { profitMargin, finalProfit } = skuWithCalculatedParams;

        skusDataToClient.push({ skuIndex, data: { profitMargin, finalProfit, costprice: lastCostPrice } });
      }

      var updatedReport = await calc.total.restParams(totalParams, updatedSKUS);
      var updatedTaxParams = { insuranceFeePercentage, paidInsuranceFee: totalPaidInsuranceFee };

      await saveUpdatedReport(userId, reportId, updatedReport, session);
      await changeTaxParamsToDb(userId, taxYear, session, updatedTaxParams);

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
