var calc = require("../../reports/services/calcServices");
var recalculateReportsTaxRate = require("../services/recalculateReportsTaxRate");

var recalculateReportsParamsAfterChangingTaxRate = async (req, res, next) => {
  var { year, userId, taxRate } = req.body;
  var { getReportsByUserId, saveUpdatedReports } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changePaidTaxAmountToDb, changeInsuranceFeePercentageToDb } = req.app.locals.taxParamsCollectionServices;

  var { reports } = await getReportsByUserId(userId);

  if (reports.length == 0) {
    return res.sendStatus(200);
  }

  reports = await recalculateReportsTaxRate(taxRate, year, reports);

  var paidTaxAmount = 0,
    shouldResetInsuranceFeePercentage;

  var { mandatoryInsuranceFee } = await getTaxParamsFromDb(userId, year);

  for (var i = reports.length - 1; i >= 0; i--) {
    if (reports[i].recordTo.year == year) {
      await Promise.all(
        reports[i].skus.map(async (sku) => {
          paidTaxAmount += sku.tax;

          if (sku.isCostPriceSet) {
            if (paidTaxAmount >= mandatoryInsuranceFee) {
              sku.isInsuranceFeeIncluded = false;
              shouldResetInsuranceFeePercentage = true;

              sku.finalProfitPerSKU = calc.sku.finalProfit(sku.preTaxProfitPerSKU, 0, sku.taxb);
            } else {
              sku.isInsuranceFeeIncluded = true;

              sku.finalProfitPerSKU = calc.sku.finalProfit(sku.preTaxProfitPerSKU, sku.insuranceFee);
            }

            sku.profitMargin = calc.sku.profitMargin(sku.revenuePerSKU, sku.finalProfitPerSKU);
          }
        })
      );
    }
  }

  await changePaidTaxAmountToDb(userId, year, paidTaxAmount);

  if (shouldResetInsuranceFeePercentage) {
    await changeInsuranceFeePercentageToDb(userId, 0, year);
  }

  var successUpdate = await saveUpdatedReports(userId, reports);

  if (successUpdate) {
    return res.sendStatus(200);
  }

  return res.sendStatus(304);
};

module.exports = recalculateReportsParamsAfterChangingTaxRate;
