var calc = require("../calcServices");

var recalculateFinalSkuMetrics = (year, skuFromListGoods, sku, previousFinalSkuData, postfix = "") => {
  var indexOfYearMetrics = skuFromListGoods.metrics.findIndex((i) => i.year === year);
  console.log({ previousFinalSkuData });
  console.log({ prev: previousFinalSkuData["finalProfit" + postfix], current: sku["finalProfit" + postfix] });

  var result = sku["finalProfit" + postfix] - previousFinalSkuData["finalProfit" + postfix];
  // console.log({
  //   result,
  //   prevNet: skuFromListGoods.metrics[indexOfYearMetrics].netProfit,
  //   netProfit: skuFromListGoods.metrics[indexOfYearMetrics].netProfit + result,
  // });
  skuFromListGoods.metrics[indexOfYearMetrics].netProfit += result;
  console.log({ metrics: skuFromListGoods.metrics[indexOfYearMetrics] });
  skuFromListGoods.metrics[indexOfYearMetrics].insuranceFee =
    skuFromListGoods.metrics[indexOfYearMetrics].insuranceFee - previousFinalSkuData["insuranceFee" + postfix] + sku["insuranceFee" + postfix];

  var { retailAmount, netProfit } = skuFromListGoods.metrics[indexOfYearMetrics];

  skuFromListGoods.metrics[indexOfYearMetrics].profitMargin = calc.profitMargin(netProfit, retailAmount);

  return skuFromListGoods;
};

module.exports = recalculateFinalSkuMetrics;
