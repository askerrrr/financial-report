var calc = require("../calcServices");
var truncateNum = require("../reportParsing/truncateNum");

var recalculateFinalSkuMetrics = (year, skuFromListGoods, sku, previousFinalSkuData, postfix = "") => {
  var skuMetrics = skuFromListGoods.metrics.find((i) => i.year === year);

  var recalculatedNetProfit = skuMetrics.netProfit - previousFinalSkuData["finalProfit" + postfix] + sku["finalProfit" + postfix];
  skuMetrics.netProfit = truncateNum(recalculatedNetProfit);

  var recalculatedInsuranceFee = skuMetrics.insuranceFee - previousFinalSkuData["insuranceFee" + postfix] + sku["insuranceFee" + postfix];
  skuMetrics.insuranceFee = truncateNum(recalculatedInsuranceFee);

  skuMetrics.profitMargin = calc.profitMargin(skuMetrics.netProfit, skuMetrics.retailAmount);

  return skuFromListGoods;
};

module.exports = recalculateFinalSkuMetrics;
