var calc = require("../../reports/services/calcServices");

var recalculateReportsWithNewTaxRate = (reports, paidTaxAmount, newTaxRate, taxYear) => {
  var finalProfit = 0;
  var currentYearPostfix = "InCurrentYear";
  var nextYearPostfix = "InNextYear";

  for (var report of reports) {
    var postfix;

    if (report.crossesTaxYears) {
      var startYear = +report.dateFrom.split("-")[0];
      postfix = startYear == taxYear ? currentYearPostfix : nextYearPostfix;
    }

    for (sku of report.skus) {
      if (sku.isCostPriceSet) {
        if (report.crossesTaxYears) {
          sku["tax" + postfix] = calc.taxAmount(sku["retailAmount" + postfix], newTaxRate);
          sku.tax = sku.taxInCurrentYear + sku.taxInNextYear;

          sku["finalProfit" + postfix] = calc.finalProfit(
            sku["preTaxProfit" + postfix],
            sku["insuranceFee" + postfix],
            sku["tax" + postfix],
            sku["additionalInsuranceFee" + postfix]
          );
          sku.finalProfit = sku.finalProfitInCurrentYear + sku.finalProfitInNextYear;

          paidTaxAmount += sku["tax" + postfix];
          finalProfit += sku["finalProfit" + postfix];
        } else {
          sku.tax = calc.taxAmount(sku.retailAmount, newTaxRate);
          sku.finalProfit = calc.finalProfit(sku.preTaxProfit, sku.insuranceFee, sku.tax, sku.additionalInsuranceFee);

          paidTaxAmount += sku.tax;
          finalProfit += sku.finalProfit;
        }
      }
    }

    if (postfix) {
      report["totalTaxAmount" + postfix] = calc.sum(report.skus, "tax" + postfix, "truncate-on");
      report.totalTaxAmount = report.totalTaxAmountInCurrentYear + report.totalTaxAmountInNextYear;

      report["totalFinalProfit" + postfix] = calc.sum(report.skus, "finalProfit" + postfix, "truncate-on");
      report.totalFinalProfit = report.totalFinalProfitInCurrentYear + report.totalFinalProfitInNextYear;
    } else {
      report.totalTaxAmount = calc.sum(report.skus, "tax", "truncate-on");
      report.totalFinalProfit = calc.sum(report.skus, "finalProfit", "truncate-on");
    }
  }

  return { finalProfit, paidTaxAmount, reports };
};

module.exports = recalculateReportsWithNewTaxRate;
