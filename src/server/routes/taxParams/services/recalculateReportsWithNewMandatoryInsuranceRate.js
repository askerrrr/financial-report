var calc = require("../../reports/services/calcServices");

var recalculateReportsWithNewMandatoryInsuranceRate = (reports, mandatoryInsuranceFee, mandatoryInsuranceRate, taxYear) => {
  var finalProfit = 0;
  var paidInsuranceFee = 0;
  var mandatoryInsuranceFeeIsPaid = false;
  var currentYearPostfix = "InCurrentYear";
  var nextYearPostfix = "InNextYear";

  for (var report of reports) {
    var postfix;

    if (report.crossesTaxYears) {
      var startYear = +report.dateFrom.split("-")[0];
      postfix = startYear == taxYear ? currentYearPostfix : nextYearPostfix;
    }

    for (sku of report.skus) {
      if (report.crossesTaxYears) {
        if (sku.isCostPriceSet) {
          var newSkuInsuranceFee = 0;

          if (!mandatoryInsuranceFeeIsPaid) {
            newSkuInsuranceFee = calc.insuranceFee(sku["preTaxProfit" + postfix], mandatoryInsuranceRate);
          }

          sku["insuranceFee" + postfix] = newSkuInsuranceFee;
          paidInsuranceFee += newSkuInsuranceFee;

          if (paidInsuranceFee > mandatoryInsuranceFee) {
            var difference = paidInsuranceFee - mandatoryInsuranceFee;
            newSkuInsuranceFee -= difference;
            mandatoryInsuranceFeeIsPaid = true;
          }

          sku["finalProfit" + postfix] = calc.finalProfit(
            sku["preTaxProfit" + postfix],
            newSkuInsuranceFee,
            sku["tax" + postfix],
            sku["additionalInsuranceFee" + postfix]
          );

          sku.insuranceFee = sku.insuranceFeeInCurrentYear + sku.insuranceFeeInNextYear;
          sku.finalProfit = sku.finalProfitInCurrentYear + sku.finalProfitInNextYear;

          finalProfit += sku["finalProfit" + postfix];
        }
      } else {
        var newSkuInsuranceFee = 0;

        if (!mandatoryInsuranceFeeIsPaid) {
          newSkuInsuranceFee = calc.insuranceFee(sku.preTaxProfit, mandatoryInsuranceRate);
        }

        paidInsuranceFee += newSkuInsuranceFee;

        if (paidInsuranceFee > mandatoryInsuranceFee) {
          var difference = paidInsuranceFee - mandatoryInsuranceFee;
          newSkuInsuranceFee -= difference;
          mandatoryInsuranceFeeIsPaid = true;
        }

        sku.insuranceFee = newSkuInsuranceFee;
        sku.finalProfit = calc.finalProfit(sku.preTaxProfit, newSkuInsuranceFee, sku.tax, sku.additionalInsuranceFee);

        finalProfit += sku.finalProfit;
      }
    }

    if (postfix) {
      report["totalInsuranceFee" + postfix] = calc.sum(report.skus, "insuranceFee" + postfix, "truncate-on");
      report.totalInsuranceFee = report.totalInsuranceFeeInCurrentYear + report.totalInsuranceFeeInNextYear;

      report["totalFinalProfit" + postfix] = calc.sum(report.skus, "finalProfit" + postfix, "truncate-on");
      report.totalFinalProfit = report.totalFinalProfitInCurrentYear + report.totalFinalProfitInNextYear;
    } else {
      report.totalInsuranceFee = calc.sum(report.skus, "insuranceFee", "truncate-on");
      report.totalFinalProfit = calc.sum(report.skus, "finalProfit", "truncate-on");
    }
  }

  return { reports, finalProfit, mandatoryInsuranceFeeIsPaid, paidInsuranceFee, mandatoryInsuranceRate };
};

module.exports = recalculateReportsWithNewMandatoryInsuranceRate;

//sku = 15;
//max = 100;
//last = 90;
//after = 105;
//diff = after = max;
//diff = 5;
//sku = sku = diff
