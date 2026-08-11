import calc from "../../reports/services/calcServices/index.js";
import truncateNum from "../../reports/services/reportParsing/truncateNum.js";

var recalculateReportsWithNewMandatoryInsuranceRate = (taxYear, reports, listGoods, mandatoryInsuranceFee, mandatoryInsuranceRate) => {
  var finalProfit = 0;
  var paidInsuranceFee = 0;
  var mandatoryInsuranceFeeIsPaid = false;
  var startYearPostfix = "InCurrentYear";
  var endYearPostfix = "InNextYear";

  for (var report of reports) {
    var postfix = "";

    if (report.isCrossYearPeriod) {
      var startYear = +report.dateFrom.split("-")[0];
      postfix = startYear == taxYear ? startYearPostfix : endYearPostfix;
    }

    for (var sku of report.skus) {
      var skuFromListGoods = listGoods.find((i) => i.id === sku.id && i.skuName === sku.skuName);
      var skuMetrics = skuFromListGoods?.metrics.find((i) => i.year === taxYear);

      if (report.isCrossYearPeriod) {
        var prevSkuInsuranceFee = sku["insuranceFee" + postfix];

        if (sku["isCostPriceSet" + postfix]) {
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

          sku["finalProfit" + postfix] = calc.finalProfit(sku, postfix);

          sku.insuranceFee = sku.insuranceFeeInCurrentYear + sku.insuranceFeeInNextYear;
          sku.finalProfit = sku.finalProfitInCurrentYear + sku.finalProfitInNextYear;

          if (skuMetrics) {
            var recalculatedInsuranceFeeForSkuMetrics = skuMetrics.insuranceFee - prevSkuInsuranceFee + newSkuInsuranceFee;
            var recalculatedNetProfitForSkuMetrics = skuMetrics.newProfit - prevSkuFinalProfit + sku["finalProfit" + postfix];

            skuMetrics.insuranceFee = truncateNum(recalculatedInsuranceFeeForSkuMetrics);
            skuMetrics.newProfit = truncateNum(recalculatedNetProfitForSkuMetrics);
          }

          finalProfit += sku["finalProfit" + postfix];
        }
      } else {
        var prevSkuInsuranceFee = sku.insuranceFee;
        var newSkuInsuranceFee = 0;

        if (sku["isCostPriceSet" + postfix]) {
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
          sku.finalProfit = calc.finalProfit(sku, postfix);

          if (skuMetrics) {
            var recalculatedInsuranceFeeForSkuMetrics = skuMetrics.insuranceFee - prevSkuInsuranceFee + newSkuInsuranceFee;
            var recalculatedNetProfitForSkuMetrics = skuMetrics.netProfit - prevSkuFinalProfit + sku.finalProfit;

            skuMetrics.insuranceFee = truncateNum(recalculatedInsuranceFeeForSkuMetrics);
            skuMetrics.netProfit = truncateNum(recalculatedNetProfitForSkuMetrics);
          }

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

    postfix = "";
  }

  return {
    finalProfit,
    paidInsuranceFee,
    updatedReports: reports,
    mandatoryInsuranceFeeIsPaid,
    listGoodsWithUpdatedSkuMetrics: listGoods,
  };
};

export default recalculateReportsWithNewMandatoryInsuranceRate;
