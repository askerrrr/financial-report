var changeElementInArray = require("../services/different/changeElementInArray");
var calcRestSKUParams = require("../services/writeAndCalcReportDataFromWBAPI/calcServices/restSKUParams");
var calcRestReportTotalParams = require("../services/writeAndCalcReportDataFromWBAPI/calcServices/restReportTotalParams");

var changeReportDetail = async (req, res, next) => {
  var { userId, reportId, skuIndex, costPrice, year } = req.body;
  var { saveUpdatedReport, getReportById } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changePaidInsuranceFeeToDb, changeInsuranceFeePercentageToDb } = req.app.locals.taxParamsCollectionServices;

  var { skus, ...totalParams } = await getReportById(userId, reportId);

  var changedSKUs = await changeElementInArray(skus, req.body);

  var sku = changedSKUs[skuIndex];

  var taxParams = await getTaxParamsFromDb(userId, year);

  var { skuWithCalculatedParams, insuranceFeePercentage, recalculatedPaidInsuranceFee } = await calcRestSKUParams(sku, costPrice, taxParams);

  await changePaidInsuranceFeeToDb(userId, year, recalculatedPaidInsuranceFee);
  await changeInsuranceFeePercentageToDb(userId, year, insuranceFeePercentage);

  changedSKUs[skuIndex] = skuWithCalculatedParams;

  var updatedReport = await calcRestReportTotalParams(totalParams, changedSKUs);

  var success = await saveUpdatedReport(userId, reportId, updatedReport);

  if (success) {
    var { totalFinalProfit, totalProfitMargin } = updatedReport;
    var { profitMargin, finalProfitPerSKU } = skuWithCalculatedParams;

    return res.status(200).json({
      skuIndex,
      profitMargin,
      finalProfitPerSKU,
      total: { totalFinalProfit, totalProfitMargin },
    });
  }

  return res.sendStatus(304);
};

module.exports = changeReportDetail;
