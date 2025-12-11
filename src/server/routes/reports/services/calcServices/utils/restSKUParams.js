var calcFinalProfit = require("./finalProfit");
var calcProfitMargin = require("./profitMargin");
var calcInsuranceFee = require("./insuranceFee");
var calcPreTaxProfit = require("./preTaxProfit");

var calcRestSKUParams = (sku, taxParams) => {
  sku.preTaxProfit = calcPreTaxProfit(sku.qty, sku.profit, sku.costPrice);

  var { insuranceFeePercentage, paidTaxAmount, mandatoryInsuranceFee } = taxParams;

  var newInsuranceFee = calcInsuranceFee(sku.preTaxProfit, insuranceFeePercentage);

  var isInsuranceFeeIncluded = true;

  // if (paidTaxAmount >= mandatoryInsuranceFee) {
  //   insuranceFeePercentage = 0;
  //   isInsuranceFeeIncluded = false;

  //   finalProfit = calcFinalProfit(preTaxProfit, 0, sku.tax);
  // } else {
  //   finalProfit = calcFinalProfit(preTaxProfit, newInsuranceFee);
  // }

  sku.isCostPriceSet = true;
  sku.insuranceFee = newInsuranceFee;
  sku.isInsuranceFeeIncluded = isInsuranceFeeIncluded;
  sku.finalProfit = calcFinalProfit(sku.preTaxProfit, 0, sku.tax);
  sku.profitMargin = calcProfitMargin(sku.finalProfit, sku.retailAmount);

  var recalculatedPaidInsuranceFee = mandatoryInsuranceFee - sku.insuranceFee + newInsuranceFee;

  return { recalculatedPaidInsuranceFee, insuranceFeePercentage, skuWithCalculatedParams: sku };
};

module.exports = calcRestSKUParams;
