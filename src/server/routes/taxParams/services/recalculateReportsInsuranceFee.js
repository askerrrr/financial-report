var calc = require("../../reports/services/calcServices");

var recalculateReportsInsuranceFee = async (year, reports, newPercent, taxParams) => {
  var { paidTaxAmount, mandatoryInsuranceFee } = taxParams;

  var recalculatedPaidInsuranceFee = 0;

  for (var i = reports.length - 1; i >= 0; i--) {
    if (reports[i].recordTo.year == year) {
      await Promise.all(
        reports[i].skus.map(async (sku) => {
          if (sku.isCostPriceSet) {
            sku.insuranceFee = (sku.preTaxProfitPerSKU, newPercent);
            recalculatedPaidInsuranceFee += sku.insuranceFee;

            if (paidTaxAmount >= mandatoryInsuranceFee) {
              newPercent = 0;
              sku.isInsuranceFeeIncluded = false;
              sku.finalProfitPerSKU = calc.sku.finalProfit(sku.preTaxProfitPerSKU, 0, sku.taxPerSKU);
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

  return { reports, newPercent, recalculatedPaidInsuranceFee };
};

module.exports = recalculateReportsInsuranceFee;
