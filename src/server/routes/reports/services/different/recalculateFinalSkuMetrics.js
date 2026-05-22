import calc from "../calcServices/index.js";
import truncateNum from "../reportParsing/truncateNum.js";

var recalculateFinalSkuMetrics = (year, skuFromListGoods, sku, prevSkuData, postfix = "") => {
  var skuMetrics = skuFromListGoods.metrics.find((i) => i.year === year);

  var recalculatedOtherExpenses = skuMetrics.otherExpenses - prevSkuData["otherExpenses" + postfix] + sku["otherExpenses" + postfix];
  skuMetrics.otherExpenses = truncateNum(recalculatedOtherExpenses);

  var recalculatedNetProfit = skuMetrics.netProfit - prevSkuData["finalProfit" + postfix] + sku["finalProfit" + postfix];
  skuMetrics.netProfit = truncateNum(recalculatedNetProfit);

  var recalculatedInsuranceFee = skuMetrics.insuranceFee - prevSkuData["insuranceFee" + postfix] + sku["insuranceFee" + postfix];
  skuMetrics.insuranceFee = truncateNum(recalculatedInsuranceFee);

  skuMetrics.profitMargin = calc.profitMargin(skuMetrics.netProfit, skuMetrics.retailAmount);

  return skuFromListGoods;
};

export default recalculateFinalSkuMetrics;
