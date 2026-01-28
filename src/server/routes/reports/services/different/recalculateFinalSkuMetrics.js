var calc = require("../calcServices");

var recalculateFinalSkuMetrics = (year, skuFromListGoods, sku, previousFinalSkuData, postfix = "") => {
  var indexOfYearMetrics = skuFromListGoods.metrics.findIndex((i) => i.year === year);

  var newNetProfit = sku["finalProfit" + postfix] - previousFinalSkuData["finalProfit" + postfix];
  skuFromListGoods.metrics[indexOfYearMetrics].netProfit += newNetProfit;

  var newInsuranceFee = sku["insuranceFee" + postfix] - previousFinalSkuData["insuranceFee" + postfix];
  skuFromListGoods.metrics[indexOfYearMetrics].insuranceFee += newInsuranceFee;
  var { retailAmount, netProfit } = skuFromListGoods.metrics[indexOfYearMetrics];

  skuFromListGoods.metrics[indexOfYearMetrics].profitMargin = calc.profitMargin(netProfit, retailAmount);
  return skuFromListGoods;
};

module.exports = recalculateFinalSkuMetrics;
