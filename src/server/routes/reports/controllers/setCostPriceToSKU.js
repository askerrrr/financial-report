var calc = require("../services/calcServices");
var updateSkuInArray = require("../services/different/updateSkuInArray");

var setCostPriceToSKU = async (req, res, next) => {
  var { userId, reportId, skuIndex, costPrice, year } = req.body;
  var { saveUpdatedReport, getReportById } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var { report } = await getReportById(userId, reportId);
  var { skus, ...totalParams } = report;

  var { updatedSKUS, updatedSKU } = updateSkuInArray(skus, req.body);

  var taxParams = await getTaxParamsFromDb(userId, year);

  var { skuWithCalculatedParams, insuranceFeePercentage, recalculatedPaidInsuranceFee } = calc.sku.restParams(updatedSKU, costPrice, taxParams);

  var updatedTaxParams = { insuranceFeePercentage, paidInsuranceFee: recalculatedPaidInsuranceFee };

  await changeTaxParamsToDb(userId, year, (session = null), updatedTaxParams);

  updatedSKUS[skuIndex] = skuWithCalculatedParams;

  var updatedReport = await calc.total.restParams(totalParams, updatedSKUS);
  var success = await saveUpdatedReport(userId, reportId, updatedReport);

  if (success) {
    var { totalFinalProfit, totalProfitMargin } = updatedReport;
    var { profitMargin, finalProfitPerSKU } = skuWithCalculatedParams;

    return res.status(200).json({
      sku: {
        skuIndex,
        data: {
          profitMargin,
          finalProfitPerSKU,
        },
      },
      total: { totalFinalProfit, totalProfitMargin },
    });
  }

  return res.sendStatus(304);
};

module.exports = setCostPriceToSKU;
