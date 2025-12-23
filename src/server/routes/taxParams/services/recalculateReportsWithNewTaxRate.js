var calc = require("../../reports/services/calcServices");

var recalculateReportsWithNewTaxRate = (reports, paidTaxAmount, newTaxRate) => {
  var finalProfit = 0;

  for (var report of reports) {
    for (sku of report.skus) {
      sku.tax = calc.taxAmount(sku.retailAmount, newTaxRate);
      paidTaxAmount += sku.tax;

      if (sku.isCostPriceSet) {
        sku.finalProfit = calc.finalProfit(sku.preTaxProfit, sku.insuranceFee, sku.tax, sku.additionalInsuranceFee);
        finalProfit += sku.finalProfit;
      }
    }
  }

  return { finalProfit, paidTaxAmount, reports };
};

module.exports = recalculateReportsWithNewTaxRate;
