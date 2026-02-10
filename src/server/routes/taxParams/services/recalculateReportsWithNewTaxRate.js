var calc = require("../../reports/services/calcServices");
var truncateNum = require("../../reports/services/reportParsing/truncateNum");

var recalculateReportsWithNewTaxRate = (reports, listGoods, paidTaxAmount, newTaxRate, taxYear) => {
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
      var skuFromListGoods = listGoods.find((i) => i.id === sku.id && i.skuName === sku.skuName);

      if (report.crossesTaxYears) {
        var prevSkuTax = sku["tax" + postfix];
        sku["tax" + postfix] = calc.taxAmount(sku["retailAmount" + postfix], newTaxRate);
        sku.tax = sku.taxInCurrentYear + sku.taxInNextYear;
        paidTaxAmount += sku["tax" + postfix];

        var startYearSkuMetrics = skuFromListGoods.metrics.find((i) => i.year === startYear);

        var recalculatedTaxToSkuMetrics = startYearSkuMetrics.tax - prevSkuTax + sku["tax" + postfix];
        startYearSkuMetrics.tax = truncateNum(recalculatedTaxToSkuMetrics);

        if (sku.isCostPriceSet) {
          var prevSkuFinalProfit = sku["finalProfit" + postfix];

          sku["finalProfit" + postfix] = calc.finalProfit(
            sku["preTaxProfit" + postfix],
            sku["insuranceFee" + postfix],
            sku["tax" + postfix],
            sku["additionalInsuranceFee" + postfix],
          );

          sku.finalProfit = sku.finalProfitInCurrentYear + sku.finalProfitInNextYear;
          finalProfit += sku["finalProfit" + postfix];

          var recalculatedNetProfitToSkuMetrics = startYearSkuMetrics.netProfit - prevSkuFinalProfit + sku["finalProfit" + postfix];
          startYearSkuMetrics.netProfit = truncateNum(recalculatedNetProfitToSkuMetrics);
          skuMetrics.profitMargin = calc.profitMargin(skuMetrics.netProfit, skuMetrics.retailAmount);
        }
      } else {
        var prevSkuTax = sku.tax;
        sku.tax = calc.taxAmount(sku.retailAmount, newTaxRate);
        paidTaxAmount += sku.tax;

        var skuMetrics = skuFromListGoods.metrics.find((i) => i.year === taxYear);
        var recalculatedTaxToSkuMetrics = skuMetrics.tax - prevSkuTax + sku.tax;
        skuMetrics.tax = truncateNum(recalculatedTaxToSkuMetrics);

        if (sku.isCostPriceSet) {
          var prevSkuFinalProfit = sku.finalProfit;
          sku.finalProfit = calc.finalProfit(sku.preTaxProfit, sku.insuranceFee, sku.tax, sku.additionalInsuranceFee);
          finalProfit += sku.finalProfit;

          var recalculatedNetProfitToSkuMetrics = skuMetrics.netProfit - prevSkuFinalProfit + sku.finalProfit;

          skuMetrics.netProfit = truncateNum(recalculatedNetProfitToSkuMetrics);
          skuMetrics.profitMargin = calc.profitMargin(skuMetrics.netProfit, skuMetrics.retailAmount);
        }
      }
    }

    if (postfix) {
      report["totalTaxAmount" + postfix] = calc.sum(report.skus, "tax" + postfix, "truncate-on");
      report.totalTaxAmount = report.totalTaxAmountInCurrentYear + report.totalTaxAmountInNextYear;

      report["totalFinalProfit" + postfix] = calc.sum(report.skus, "finalProfit" + postfix, "truncate-on");
      report.totalFinalProfit = report.totalFinalProfitInCurrentYear + report.totalFinalProfitInNextYear;
    } else {
      report.taxRate = newTaxRate;
      report.totalTaxAmount = calc.sum(report.skus, "tax", "truncate-on");
      report.totalFinalProfit = calc.sum(report.skus, "finalProfit", "truncate-on");
    }
  }

  return { finalProfit, paidTaxAmount, updatedReports: reports, listGoodsWithUpdatedSkuMetrics: listGoods };
};

module.exports = recalculateReportsWithNewTaxRate;
