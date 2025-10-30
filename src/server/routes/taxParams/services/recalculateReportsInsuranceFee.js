var calc = require("../../reports/services/calcServices");

var recalculateReportsInsuranceFee = async (year, reports, newPercent, taxParams) => {
  var { paidTaxAmount, mandatoryInsuranceFee } = taxParams;

  var recalculatedPaidInsuranceFee = 0;

  for (var i = reports.length - 1; i >= 0; i--) {
    if (reports[i].recordTo.year == year) {
      await Promise.all(
        reports[i].skus.map(async (sku) => {
          if (sku.isCostPriceSet) {
            sku.insuranceFee = (sku.preTaxProfit, newPercent);
            recalculatedPaidInsuranceFee += sku.insuranceFee;

            if (paidTaxAmount >= mandatoryInsuranceFee) {
              newPercent = 0;
              sku.isInsuranceFeeIncluded = false;
              sku.finalProfit = calc.sku.finalProfit(sku.preTaxProfit, 0, sku.tax);
            } else {
              sku.isInsuranceFeeIncluded = true;
              sku.finalProfit = calc.sku.finalProfit(sku.preTaxProfit, sku.insuranceFee);
            }

            sku.profitMargin = calc.sku.profitMargin(sku.revenue, sku.finalProfit);
          }
        })
      );
    }
  }

  return { reports, newPercent, recalculatedPaidInsuranceFee };
};

module.exports = recalculateReportsInsuranceFee;
