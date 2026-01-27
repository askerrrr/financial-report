var calc = require("../calcServices");

var recalculateFinalSkuMetrics = (year, skuFromListGoods, sku, previousFinalSkuData, postfix = "") => {
  var indexOfYearMetrics = skuFromListGoods.metrics.findIndex((i) => i.year === year);

  console.log({ prev: previousFinalSkuData["finalProfit" + postfix], current: sku["finalProfit" + postfix] });

  skuFromListGoods.metrics[indexOfYearMetrics].netProfit -= previousFinalSkuData["finalProfit" + postfix] - sku["finalProfit" + postfix];

  skuFromListGoods.metrics[indexOfYearMetrics].insuranceFee =
    skuFromListGoods.metrics[indexOfYearMetrics].insuranceFee - previousFinalSkuData["insuranceFee" + postfix] + sku["insuranceFee" + postfix];

  var { retailAmount, netProfit } = skuFromListGoods.metrics[indexOfYearMetrics];

  skuFromListGoods.metrics[indexOfYearMetrics].profitMargin = calc.profitMargin(netProfit, retailAmount);

  return skuFromListGoods;
};

module.exports = recalculateFinalSkuMetrics;
