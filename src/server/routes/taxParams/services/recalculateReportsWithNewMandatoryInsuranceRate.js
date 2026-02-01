var calc = require("../../reports/services/calcServices");
var truncateNum = require("../../reports/services/reportParsing/truncateNum");

var recalculateReportsWithNewMandatoryInsuranceRate = (reports, listGoods, mandatoryInsuranceFee, mandatoryInsuranceRate, taxYear) => {
  var finalProfit = 0;
  var paidInsuranceFee = 0;
  var mandatoryInsuranceFeeIsPaid = false;
  var startYearPostfix = "InCurrentYear";
  var endYearPostfix = "InNextYear";

  for (var report of reports) {
    var postfix;

    if (report.crossesTaxYears) {
      var startYear = +report.dateFrom.split("-")[0];
      postfix = startYear == taxYear ? startYearPostfix : endYearPostfix;
    }

    for (sku of report.skus) {
      var skuFromListGoods = listGoods.find((i) => i.id === sku.id);

      if (report.crossesTaxYears) {
        var prevSkuInsuranceFee = sku["insuranceFee" + postfix];

        if (sku.isCostPriceSet) {
          var prevSkuFinalProfit = sku["finalProfit" + postfix];
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

          var skuMetrics = skuFromListGoods.find((i) => i.year === taxYear);

          sku["finalProfit" + postfix] = calc.finalProfit(
            sku["preTaxProfit" + postfix],
            newSkuInsuranceFee,
            sku["tax" + postfix],
            sku["additionalInsuranceFee" + postfix],
          );

          sku.insuranceFee = sku.insuranceFeeInCurrentYear + sku.insuranceFeeInNextYear;
          sku.finalProfit = sku.finalProfitInCurrentYear + sku.finalProfitInNextYear;

          var recalculatedInsuranceFeeForSkuMetrics = skuMetrics.insuranceFee - prevSkuInsuranceFee + newSkuInsuranceFee;
          var recalculatedNetProfitForSkuMetrics = skuMetrics.newProfit - prevSkuFinalProfit + sku["finalProfit" + postfix];

          skuMetrics.insuranceFee = truncateNum(recalculatedInsuranceFeeForSkuMetrics);
          skuMetrics.newProfit = truncateNum(recalculatedNetProfitForSkuMetrics);

          finalProfit += sku["finalProfit" + postfix];
        }
      } else {
        var prevSkuInsuranceFee = sku.insuranceFee;
        var newSkuInsuranceFee = 0;

        if (sku.isCostPriceSet) {
          var prevSkuFinalProfit = sku.finalProfit;

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

          var recalculatedInsuranceFeeForSkuMetrics = skuMetrics.insuranceFee - prevSkuInsuranceFee + newSkuInsuranceFee;
          var recalculatedNetProfitForSkuMetrics = skuMetrics.netProfit - prevSkuFinalProfit + sku.finalProfit;

          skuMetrics.insuranceFee = truncateNum(recalculatedInsuranceFeeForSkuMetrics);
          skuMetrics.netProfit = truncateNum(recalculatedNetProfitForSkuMetrics);

          finalProfit += sku.finalProfit;
        }
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

  return { reports, finalProfit, mandatoryInsuranceFeeIsPaid, paidInsuranceFee, mandatoryInsuranceRate, listGoodsWithUpdatedSkuMetrics: listGoods };
};

module.exports = recalculateReportsWithNewMandatoryInsuranceRate;
