var calc = require("../calcServices");
var truncateNum = require("../reportParsing/truncateNum");

var recalculateFinalSkuMetrics = (year, skuFromListGoods, sku, previousFinalSkuData, postfix = "") => {
  var indexOfYearMetrics = skuFromListGoods.metrics.findIndex((i) => i.year === year);
  var skuMetrics = skuFromListGoods.metrics[indexOfYearMetrics];

  var recalculatedNetProfit = skuMetrics.netProfit - previousFinalSkuData["finalProfit" + postfix] + sku["finalProfit" + postfix];
  skuMetrics.netProfit = truncateNum(recalculatedNetProfit);

  var recalculatedInsuranceFee = skuMetrics.insuranceFee - previousFinalSkuData["insuranceFee" + postfix] + sku["insuranceFee" + postfix];
  skuMetrics.insuranceFee = truncateNum(recalculatedInsuranceFee);

  skuMetrics.profitMargin = calc.profitMargin(skuMetrics.netProfit, skuMetrics.retailAmount);

  skuFromListGoods.metrics[indexOfYearMetrics] = skuMetrics;
  return skuFromListGoods;
};

module.exports = recalculateFinalSkuMetrics;
