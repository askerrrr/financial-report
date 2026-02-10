var calc = require("../calcServices");
var truncateNum = require("../reportParsing/truncateNum");

var startYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var recalculateMetrics = (skuMetrics, sku, postfix = "") => {
  skuMetrics.qty -= sku["qty" + postfix] ?? 0;
  skuMetrics.tax -= sku["tax" + postfix] ?? 0;
  skuMetrics.fines -= sku["fines" + postfix] ?? 0;
  skuMetrics.netProfit -= sku["finalProfit" + postfix] ?? 0;
  skuMetrics.retailAmount -= sku["retailAmount" + postfix] ?? 0;
  skuMetrics.insuranceFee -= sku["insuranceFee" + postfix] ?? 0;
  skuMetrics.returnAmount -= sku["returnAmount" + postfix] ?? 0;
  skuMetrics.storageCost -= sku["storageCost" + postfix] ?? 0;
  skuMetrics.deliveryCost -= sku["deliveryCost" + postfix] ?? 0;
  skuMetrics.acceptance -= sku["acceptance" + postfix] ?? 0;
  skuMetrics.sellerPayoutAmount -= sku["sellerPayoutAmount" + postfix] ?? 0;
  skuMetrics.deductionOrPayment -= sku["deductionOrPayment" + postfix] ?? 0;
  skuMetrics.additionalInsuranceFee -= sku["additionalInsuranceFee" + postfix] ?? 0;

  for (var key in skuMetrics) {
    skuMetrics[key] = truncateNum(skuMetrics[key]);
  }

  skuMetrics.profitMargin = calc.profitMargin(skuMetrics.netProfit, skuMetrics.retailAmount);

  return skuMetrics;
};

var recalculateSkuMetricsAfterReportDeletion = (startYear, endYear, listGoods, report) => {
  for (var sku of report.skus) {
    var skuFromListGoods = listGoods.find((i) => i.id === sku.id && i.skuName === sku.skuName);

    if (report.crossesTaxYears) {
      var startYearMetrics = skuFromListGoods.metrics.find((i) => i.year === startYear);
      var endYearMetrics = skuFromListGoods.metrics.find((i) => i.year === endYear);

      startYearMetrics = recalculateMetrics(startYearMetrics, sku, startYearPostfix);
      endYearMetrics = recalculateMetrics(endYearMetrics, sku, endYearPostfix);
    } else {
      var skuMetrics = skuFromListGoods.metrics.find((i) => i.year === startYear);
      skuMetrics = recalculateMetrics(skuMetrics, sku);
    }
  }

  return { listGoodsWithRecalculatedSkuMetrics: listGoods };
};

module.exports = recalculateSkuMetricsAfterReportDeletion;
