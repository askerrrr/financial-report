var calc = require("../../reports/services/calcServices");
var updateSkuInArray = require("../../reports/services/different/updateSkuInArray");

var setCostPrice = async (req, res, next) => {
  var { id, reportId, skuIndex, costPrice } = req.body;

  var { report } = req.app.locals.reports.find(
    (item) => item.id == id && item.report.reportId === reportId
  );

  var { skus, ...totalParams } = report;

  var changedSKUs = updateSkuInArray(skus, req.body);

  var sku = changedSKUs[skuIndex];

  var taxParams = { paidTaxAmount: 0, insuranceFeePercentage: 0, mandatoryInsuranceFee: 0 };
  var { skuWithCalculatedParams } = calc.sku.restParams(sku, costPrice, taxParams);

  changedSKUs[skuIndex] = skuWithCalculatedParams;

  var updatedReport = calc.total.restParams(totalParams, changedSKUs);

  var { totalFinalProfit, totalProfitMargin } = updatedReport;
  var { profitMargin, finalProfit } = skuWithCalculatedParams;

  var reportIndex = req.app.locals?.reports.findIndex(
    (item) => item.id === id && item.report.reportId === reportId
  );

  req.app.locals.reports[reportIndex] = { id, report: updatedReport };

  return res.status(200).json({
    sku: {
      skuIndex,
      data: {
        profitMargin,
        finalProfit,
      },
    },
    total: { totalFinalProfit, totalProfitMargin },
  });
};

module.exports = setCostPrice;
