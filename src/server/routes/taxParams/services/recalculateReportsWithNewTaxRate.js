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
      var indexOfSkuFromListGoods = listGoods.findIndex((i) => i.id === sku.id);
      var skuFromListGoods = listGoods[indexOfSkuFromListGoods];

      if (report.crossesTaxYears) {
        var prevSkuTax = sku["tax" + postfix];
        sku["tax" + postfix] = calc.taxAmount(sku["retailAmount" + postfix], newTaxRate);
        sku.tax = sku.taxInCurrentYear + sku.taxInNextYear;
        paidTaxAmount += sku["tax" + postfix];

        var indexOfStartYearSkuMetrics = skuFromListGoods.metrics.findIndex((i) => i.year === startYear);
        var startYearSkuMetrics = skuFromListGoods.metrics[indexOfStartYearSkuMetrics];

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

        skuFromListGoods.metrics[indexOfStartYearSkuMetrics] = startYearSkuMetrics;
      } else {
        var prevSkuTax = sku.tax;
        sku.tax = calc.taxAmount(sku.retailAmount, newTaxRate);
        paidTaxAmount += sku.tax;

        var indexOfYearSkuMetrics = skuFromListGoods.metrics.findIndex((i) => i.year === taxYear);
        var skuMetrics = skuFromListGoods.metrics[indexOfYearSkuMetrics];
        skuMetrics.tax = skuMetrics.tax - prevSkuTax + sku.tax;

        if (sku.isCostPriceSet) {
          var prevSkuFinalProfit = sku.finalProfit;
          sku.finalProfit = calc.finalProfit(sku.preTaxProfit, sku.insuranceFee, sku.tax, sku.additionalInsuranceFee);
          finalProfit += sku.finalProfit;

          var recalculatedNetProfitToSkuMetrics = skuMetrics.netProfit - prevSkuFinalProfit + sku.finalProfit;

          skuMetrics.netProfit = truncateNum(recalculatedNetProfitToSkuMetrics);
          skuMetrics.profitMargin = calc.profitMargin(skuMetrics.netProfit, skuMetrics.retailAmount);
        }

        skuFromListGoods.metrics[indexOfYearSkuMetrics] = skuMetrics;
      }

      listGoods[indexOfSkuFromListGoods] = skuFromListGoods;
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

  return { finalProfit, paidTaxAmount, reports, listGoodsWithUpdatedSkuMetrics: listGoods };
};

module.exports = recalculateReportsWithNewTaxRate;
