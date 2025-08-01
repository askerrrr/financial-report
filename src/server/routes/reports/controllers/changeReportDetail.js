var changeElementInArray = require("../services/different/changeElementInArray");
var calcRestReportTotalParams = require("../services/writeAndCalcReportDataFromWBAPI/calcServices/restReportTotalParams");
var calcRestSKUParams = require("../services/writeAndCalcReportDataFromWBAPI/calcServices/restSKUParams");

var changeReportDetail = async (req, res, next) => {
  var { saveUpdatedReport, getReportById } =
    req.app.locals.reportCollectionServices;

  var { getTaxParamsFromDb } = req.app.locals.taxParamsCollectionServices;

  var { userId, reportId, skuIndex, costPrice } = req.body;

  var { skus, ...totalParams } = await getReportById(userId, reportId);

  var changedSKUs = await changeElementInArray(skus, req.body);

  var sku = changedSKUs[skuIndex];

  var taxParams = await getTaxParamsFromDb(userId);

  var skuWithCalculatedParams = await calcRestSKUParams(
    sku,
    costPrice,
    taxParams
  );

  changedSKUs[skuIndex] = skuWithCalculatedParams;

  var updatedReport = await calcRestReportTotalParams(totalParams, changedSKUs);

  var successUpdate = await saveUpdatedReport(userId, reportId, updatedReport);

  if (successUpdate) {
    var { profitMargin, finalProfitPerSKU, averageFinalProfitPerSKU } =
      skuWithCalculatedParams;

    var { totalFinalProfit, totalProfitMargin } = updatedReport;

    return res.status(200).json({
      skuIndex,
      profitMargin,
      finalProfitPerSKU,
      averageFinalProfitPerSKU,
      total: { totalFinalProfit, totalProfitMargin },
    });
  }

  return res.sendStatus(304);
};

module.exports = changeReportDetail;
