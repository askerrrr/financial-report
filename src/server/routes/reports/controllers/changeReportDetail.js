var changeElementInArray = require("../services/different/changeElementInArray");
var calcRestTotalParams = require("../services/writeAndCalcReportDataFromWBAPI/calcServices/restTotalParams");
var calcRemainingParams = require("../services/writeAndCalcReportDataFromWBAPI/calcServices/remainingParams");

var changeReportDetail = async (req, res, next) => {
  var { saveUpdatedReport, getReportById } =
    req.app.locals.reportCollectionServices;

  var { userId, reportId, index, value } = req.body;

  var { skus, ...totalParams } = await getReportById(userId, reportId);

  var changedSKUs = await changeElementInArray(skus, req.body);

  var sku = changedSKUs[index];

  var skuWithCalculatedParams = await calcRemainingParams(sku, value);

  changedSKUs[index] = skuWithCalculatedParams;

  var updatedReport = await calcRestTotalParams(totalParams, changedSKUs);

  var successUpdate = await saveUpdatedReport(userId, reportId, updatedReport);

  if (successUpdate) {
    var { netProfitMargin, finalNetProfitPerSKU, averageFinalNetProfitPerSKU } =
      skuWithCalculatedParams;

    var { totalFinalNetProfit, totalNetProfitMargin } = updatedReport;

    return res.status(200).json({
      index,
      netProfitMargin,
      finalNetProfitPerSKU,
      averageFinalNetProfitPerSKU,
      total: { totalFinalNetProfit, totalNetProfitMargin },
    });
  }

  return res.sendStatus(304);
};

module.exports = changeReportDetail;
