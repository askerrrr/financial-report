var changeElementInArray = require("../services/different/changeElementInArray");
var calcRestTotalParams = require("../services/writeAndCalcReportDataFromWBAPI/calcServices/restTotalParams");
var calcRemainingParams = require("../services/writeAndCalcReportDataFromWBAPI/calcServices/remainingParams");

var changeReportDetail = async (req, res, next) => {
  var { updateReport, getReportById } = req.app.locals.reportCollectionServices;

  var { userId, reportId } = req.body;

  var { skus, ...rest } = await getReportById(userId, reportId);

  var changedSKUs = await changeElementInArray(skus, req.body);

  var sku = changedSKUs[req.body.index];

  var skuWithCalculatedParams = await calcRemainingParams(sku, req.body.value);

  changedSKUs[req.body.index] = skuWithCalculatedParams;

  var updatedReport = await calcRestTotalParams(rest, changedSKUs);

  var successUpdate = await updateReport(userId, reportId, updatedReport);

  if (successUpdate) {
    var { netProfitMargin, finalNetProfitPerSKU, averageFinalNetProfitPerSKU } =
      skuWithCalculatedParams;

    var { totalFinalNetProfit, totalNetProfitMargin } = updatedReport;

    return res.status(200).json({
      netProfitMargin,
      finalNetProfitPerSKU,
      averageFinalNetProfitPerSKU,
      total: { totalFinalNetProfit, totalNetProfitMargin },
      index: req.body.index,
    });
  }

  return res.sendStatus(304);
};

module.exports = changeReportDetail;
