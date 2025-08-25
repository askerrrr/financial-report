var calcProfitMargin = require("../../reports/services/writeAndCalcReportDataFromWBAPI/calcServices/profitMargin");
var calcFinalProfitPerSKU = require("../../reports/services/writeAndCalcReportDataFromWBAPI/calcServices/finalProfitPerSKU");

var recalculateReportsParamsAfterChangingMandatoryInsuranceFee = async (req, res, next) => {
  var { userId, year } = req.body;
  var { getReportsByUserId, saveUpdatedReports } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changeInsuranceFeePercentageToDb } = req.app.locals.taxParamsCollectionServices;

  var reports = await getReportsByUserId(userId);
  var { insuranceFeePercentage, mandatoryInsuranceFee } = await getTaxParamsFromDb(userId, year);

  var paidTaxAmount = 0;

  for (var i = reports.length - 1; i >= 0; i--) {
    if (reports[i].recordTo.year == year) {
      await Promise.all(
        reports[i].skus.map(async (sku) => {
          paidTaxAmount += sku.taxPerSKU;

          if (paidTaxAmount >= mandatoryInsuranceFee) {
            insuranceFeePercentage = 0;
            sku.isInsuranceFeeIncluded = false;
            sku.finalProfitPerSKU = await calcFinalProfitPerSKU(sku.preTaxProfitPerSKU, 0, sku.taxPerSKU);
          } else {
            sku.isInsuranceFeeIncluded = true;
            sku.finalProfitPerSKU = await calcFinalProfitPerSKU(sku.preTaxProfitPerSKU, sku.insuranceFee);
          }

          sku.profitMargin = await calcProfitMargin(sku.revenuePerSKU, sku.finalProfitPerSKU);
        })
      );
    }
  }

  await saveUpdatedReports(userId, reports);
  await changeInsuranceFeePercentageToDb(userId, year, insuranceFeePercentage);

  return res.sendStatus(200);
};

module.exports = recalculateReportsParamsAfterChangingMandatoryInsuranceFee;
