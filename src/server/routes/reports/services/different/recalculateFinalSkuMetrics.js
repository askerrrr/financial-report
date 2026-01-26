var calc = require("../calcServices");

var recalculateFinalSkuMetrics = (year, skuFromListGoods, sku, postfix = "") => {
  var indexOfYearMetrics = skuFromListGoods.metrics.find((i) => i.year === year);

  skuFromListGoods[indexOfYearMetrics].netProfit += sku["finalProfit" + postfix];
  skuFromListGoods[indexOfYearMetrics].insuranceFee += sku["insuranceFee" + postfix];

  var { retailAmount, netProfit } = skuFromListGoods[indexOfYearMetrics];

  skuFromListGoods[indexOfYearMetrics].profitMargin = calc.profitMargin(netProfit, retailAmount);

  return skuFromListGoods;
};

module.exports = recalculateFinalSkuMetrics;
