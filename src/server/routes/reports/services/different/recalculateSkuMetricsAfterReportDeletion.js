var calc = require("../calcServices");
var truncateNum = require("../reportParsing/truncateNum");

var startYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var recalculateMetrics = (skuMetrics, sku, postfix = "") => {
  skuMetrics.qty -= sku["qty" + postfix];
  skuMetrics.tax -= sku["tax" + postfix];
  skuMetrics.fines -= sku["fines" + postfix];
  skuMetrics.netProfit -= sku["finalProfit" + postfix];
  skuMetrics.retailAmount -= sku["retailAmount" + postfix];
  skuMetrics.insuranceFee -= sku["insuranceFee" + postfix];
  skuMetrics.returnAmount -= sku["returnAmount" + postfix];
  skuMetrics.storageCost -= sku["storageCost" + postfix];
  skuMetrics.deliveryCost -= sku["deliveryCost" + postfix];
  skuMetrics.acceptance -= sku["acceptance" + postfix];
  skuMetrics.sellerPayoutAmount -= sku["sellerPayoutAmount" + postfix];
  skuMetrics.deductionOrPayment -= sku["deductionOrPayment" + postfix];
  skuMetrics.additionalInsuranceFee -= sku["additionalInsuranceFee" + postfix];

  for (var key in skuMetrics) {
    skuMetrics[key] = truncateNum(skuMetrics[key]);
  }

  skuMetrics.profitMargin = calc.profitMargin(skuMetrics.netProfit, skuMetrics.retailAmount);
  return skuMetrics;
};

var recalculateSkuMetricsAfterReportDeletion = (startYear, endYear, listGoods, report) => {
  for (var sku of report.skus) {
    var indexOfSkuFromListGoods = listGoods.findIndex((i) => i.id === sku.id);
    var skuFromListGoods = listGoods[indexOfSkuFromListGoods];

    if (report.crossesTaxYears) {
      var indexOfStartYearSkuMetrics = skuFromListGoods.metrics.findIndex((i) => i.year === startYear);
      var indexOfEndYearSkuMetrics = skuFromListGoods.metrics.findIndex((i) => i.year === endYear);

      var startYearMetrics = skuFromListGoods.metrics[indexOfStartYearSkuMetrics];
      var endYearMetrics = skuFromListGoods.metrics[indexOfEndYearSkuMetrics];

      var recalculatedStartYearSkuMetrics = recalculateMetrics(startYearMetrics, sku, startYearPostfix);
      var recalculatedEndYearSkuMetrics = recalculateMetrics(endYearMetrics, sku, endYearPostfix);

      skuFromListGoods.metrics[indexOfStartYearSkuMetrics] = recalculatedStartYearSkuMetrics;
      skuFromListGoods.metrics[indexOfEndYearSkuMetrics] = recalculatedEndYearSkuMetrics;
    } else {
      var indexOfSkuMetrics = skuFromListGoods.metrics.findIndex((i) => i.year === startYear);
      var skuMetrics = skuFromListGoods.metrics[indexOfSkuMetrics];
      var recalculatedSkuMetrics = recalculateMetrics(skuMetrics, sku);
      skuFromListGoods.metrics[indexOfSkuMetrics] = recalculatedSkuMetrics;
    }
  }

  listGoods[indexOfSkuFromListGoods] = skuFromListGoods;

  return { listGoodsWithRecalculatedSkuMetrics: listGoods };
};

module.exports = recalculateSkuMetricsAfterReportDeletion;
