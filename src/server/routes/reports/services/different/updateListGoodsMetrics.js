var aggregateSkuMetrics = (skuMetrics, sku, postfix = "") => {
  skuMetrics.qty += sku["qty" + postfix];
  skuMetrics.tax += sku["tax" + postfix];
  skuMetrics.fines += sku["fines" + postfix];
  skuMetrics.retailAmount += sku["retailAmount" + postfix];
  skuMetrics.returnAmount += sku["returnAmount" + postfix];
  skuMetrics.storageCost += sku["storageCost" + postfix];
  skuMetrics.deliveryCost += sku["deliveryCost" + postfix];
  skuMetrics.acceptance += sku["acceptance" + postfix];
  skuMetrics.sellerPayoutAmount += sku["sellerPayoutAmount" + postfix];
  skuMetrics.deductionOrPayment += sku["deductionOrPayment" + postfix];
  skuMetrics.additionalInsuranceFee += sku["additionalInsuranceFee" + postfix];

  return skuMetrics;
};

var updateListGoodsMetrics = async (report, listGoods) => {
  var currentYearPropPostfix = "InCurrentYear";
  var nextYearPropPostfix = "InNextYear";

  for (var sku of report.skus) {
    if (report.crossesTaxYears) {
      var startYear = report.dateFrom.split("-")[0];
      var endYear = report.dateTo.split("-")[0];
    } else {
      var { year } = report.recordTo;
      var skuFromListGoods = listGoods.find((i) => i.id === sku.id);
      var skuMetrics = skuFromListGoods.metrics.find((i) => i.year === year);
      skuMetrics = aggregateSkuMetrics(skuMetrics, sku);
    }
  }

  return { listGoods };
};

module.exports = updateListGoodsMetrics;
