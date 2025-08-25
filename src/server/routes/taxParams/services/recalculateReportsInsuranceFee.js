var calcProfitMargin = require("../../reports/services/writeAndCalcReportDataFromWBAPI/calcServices/profitMargin");
var calcFinalProfitPerSKU = require("../../reports/services/writeAndCalcReportDataFromWBAPI/calcServices/finalProfitPerSKU");
var calcInsuranceFeePerSKU = require("../../reports/services/writeAndCalcReportDataFromWBAPI/calcServices/insuranceFeePerSKU");

var recalculateReportsInsuranceFee = async (year, reports, newPercent, taxParams) => {
  var { paidTaxAmount, mandatoryInsuranceFee } = taxParams;

  var recalculatedPaidInsuranceFee = 0;

  for (var i = reports.length - 1; i >= 0; i--) {
    if (reports[i].recordTo.year == year) {
      await Promise.all(
        reports[i].skus.map(async (sku) => {
          if (sku.isCostPriceSet) {
            sku.insuranceFee = await calcInsuranceFeePerSKU(sku.preTaxProfitPerSKU, newPercent);
            recalculatedPaidInsuranceFee += sku.insuranceFee;

            if (paidTaxAmount >= mandatoryInsuranceFee) {
              newPercent = 0;
              sku.isInsuranceFeeIncluded = false;
              sku.finalProfitPerSKU = await calcFinalProfitPerSKU(sku.preTaxProfitPerSKU, 0, sku.taxPerSKU);
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

  return { reports, newPercent, recalculatedPaidInsuranceFee };
};

module.exports = recalculateReportsInsuranceFee;
