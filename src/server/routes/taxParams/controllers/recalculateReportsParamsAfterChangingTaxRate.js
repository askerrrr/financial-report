var recalculateReportsTaxRate = require("../services/recalculateReportsTaxRate");
var calcProfitMargin = require("../../reports/services/writeAndCalcReportDataFromWBAPI/calcServices/profitMargin");
var calcFinalProfitPerSKU = require("../../reports/services/writeAndCalcReportDataFromWBAPI/calcServices/finalProfitPerSKU");

var recalculateReportsParamsAfterChangingTaxRate = async (req, res, next) => {
  var { year, userId, taxRate } = req.body;
  var { getReportsByUserId, saveUpdatedReports } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changePaidTaxAmountToDb, changeInsuranceFeePercentageToDb } = req.app.locals.taxParamsCollectionServices;

  var reports = await getReportsByUserId(userId);

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
          paidTaxAmount += sku.taxPerSKU;

          if (sku.isCostPriceSet) {
            if (paidTaxAmount >= mandatoryInsuranceFee) {
              sku.isInsuranceFeeIncluded = false;
              shouldResetInsuranceFeePercentage = true;

              sku.finalProfitPerSKU = await calcFinalProfitPerSKU(sku.preTaxProfitPerSKU, 0, sku.taxPerSKUb);
            } else {
              sku.isInsuranceFeeIncluded = true;

              sku.finalProfitPerSKU = await calcFinalProfitPerSKU(sku.preTaxProfitPerSKU, sku.insuranceFee);
            }

            sku.profitMargin = await calcProfitMargin(sku.revenuePerSKU, sku.finalProfitPerSKU);
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
