import calc from "../calcServices/index.js";
import truncateNum from "../reportParsing/truncateNum.js";

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
  skuMetrics.taxableAmount -= sku["taxableAmount" + postfix];
  skuMetrics.sellerPayoutAmount -= sku["sellerPayoutAmount" + postfix];
  skuMetrics.deductionOrPayment -= sku["deductionOrPayment" + postfix];
  skuMetrics.additionalInsuranceFee -= sku["additionalInsuranceFee" + postfix];

  for (var metric in skuMetrics) {
    skuMetrics[metric] = truncateNum(skuMetrics[metric]);
  }

  skuMetrics.profitMargin = calc.profitMargin(skuMetrics.netProfit, skuMetrics.retailAmount);

  return skuMetrics;
};

var recalculateSkuMetricsAfterReportDeletion = (startYear, endYear, listGoods, report) => {
  if (!listGoods.length || !listGoods) {
    return { listGoodsWithRecalculatedSkuMetrics: [] };
  }

  for (var sku of report.skus) {
    var skuFromListGoods = listGoods.find((i) => i.id === sku.id && i.skuName === sku.skuName);

    if (skuFromListGoods) {
      if (report.isCrossYearPeriod) {
        var startYearMetrics = skuFromListGoods.metrics.find((i) => i.year === startYear);
        var endYearMetrics = skuFromListGoods.metrics.find((i) => i.year === endYear);

        startYearMetrics = recalculateMetrics(startYearMetrics, sku, startYearPostfix);
        endYearMetrics = recalculateMetrics(endYearMetrics, sku, endYearPostfix);
      } else {
        var skuMetrics = skuFromListGoods.metrics.find((i) => i.year === startYear);
        skuMetrics = recalculateMetrics(skuMetrics, sku);
      }
    }
  }

  return { listGoodsWithRecalculatedSkuMetrics: listGoods };
};

export default recalculateSkuMetricsAfterReportDeletion;
