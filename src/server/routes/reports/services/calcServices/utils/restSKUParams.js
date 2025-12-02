var calcProfitMargin = require("./profitMargin");
var calcFinalProfitPerSKU = require("./finalProfit");
var calcInsuranceFeePerSKU = require("./insuranceFee");
var calcPreTaxProfitPerSKU = require("./preTaxProfit");

var calcRestSKUParams = (sku, taxParams) => {
  sku.preTaxProfit = calcPreTaxProfitPerSKU(sku).truncate();

  var { insuranceFeePercentage, paidTaxAmount, mandatoryInsuranceFee } = taxParams;

  var newInsuranceFee = calcInsuranceFeePerSKU(sku.preTaxProfit, insuranceFeePercentage).truncate();

  var isInsuranceFeeIncluded = true;

  // if (paidTaxAmount >= mandatoryInsuranceFee) {
  //   insuranceFeePercentage = 0;
  //   isInsuranceFeeIncluded = false;

  //   finalProfit = calcFinalProfitPerSKU(preTaxProfit, 0, sku.tax);
  // } else {
  //   finalProfit = calcFinalProfitPerSKU(preTaxProfit, newInsuranceFee);
  // }

  sku.isCostPriceSet = true;
  sku.insuranceFee = newInsuranceFee;
  sku.isInsuranceFeeIncluded = isInsuranceFeeIncluded;
  sku.finalProfit = calcFinalProfitPerSKU(sku.preTaxProfit, 0, sku.tax).truncate();
  sku.profitMargin = calcProfitMargin(sku).truncate();

  var recalculatedPaidInsuranceFee = mandatoryInsuranceFee - sku.insuranceFee + newInsuranceFee;

  return { recalculatedPaidInsuranceFee, insuranceFeePercentage, skuWithCalculatedParams: sku };
};

module.exports = calcRestSKUParams;
