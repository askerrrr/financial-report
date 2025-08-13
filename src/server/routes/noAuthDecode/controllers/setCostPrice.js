var changeElementInArray = require("../../reports/services/different/changeElementInArray");
var calcRestSKUParams = require("../../reports/services/writeAndCalcReportDataFromWBAPI/calcServices/restSKUParams");
var calcRestReportTotalParams = require("../../reports/services/writeAndCalcReportDataFromWBAPI/calcServices/restReportTotalParams");

var setCostPrice = async (req, res, next) => {
  var { id, reportId, skuIndex, costPrice } = req.body;

  var { report } = req.app.locals.reports.find((item) => item.id == id && item.report.reportId === reportId);

  var { skus, ...totalParams } = report;

  var changedSKUs = await changeElementInArray(skus, req.body);

  var sku = changedSKUs[skuIndex];

  var taxParams = { paidTaxAmount: 0, insuranceFeePercentage: 0, mandatoryInsuranceFee: 0 };

  var { skuWithCalculatedParams } = await calcRestSKUParams(sku, costPrice, taxParams);

  changedSKUs[skuIndex] = skuWithCalculatedParams;

  var updatedReport = await calcRestReportTotalParams(totalParams, changedSKUs);

  var { totalFinalProfit, totalProfitMargin } = updatedReport;
  var { profitMargin, finalProfitPerSKU } = skuWithCalculatedParams;

  var reportIndex = req.app.locals?.reports.findIndex((item) => item.id === id && item.report.reportId === reportId);

  req.app.locals.reports[reportIndex] = { id, report: updatedReport };

  return res.status(200).json({
    skuIndex,
    profitMargin,
    finalProfitPerSKU,
    total: { totalFinalProfit, totalProfitMargin },
  });
};

module.exports = setCostPrice;
