var shortNum = require("../shortNum");
var calcProfitMargin = require("./profitMargin");
var calcFinalProfitPerSKU = require("./finalProfitPerSKU");
var calcInsuranceFeePerSKU = require("./insuranceFeePerSKU");
var calcPreTaxProfitPerSKU = require("./preTaxProfitPerSKU");

var calcRestSKUParams = async (sku, costPrice, taxParams) => {
  sku.preTaxProfitPerSKU = await calcPreTaxProfitPerSKU(sku, costPrice);

  var { insuranceFeePercentage, paidTaxAmount, mandatoryInsuranceFee } = taxParams;

  var newInsuranceFee = await calcInsuranceFeePerSKU(sku.preTaxProfitPerSKU, insuranceFeePercentage);

  var isInsuranceFeeIncluded = true;

  // if (paidTaxAmount >= mandatoryInsuranceFee) {
  //   insuranceFeePercentage = 0;
  //   isInsuranceFeeIncluded = false;

  //   finalProfitPerSKU = await calcFinalProfitPerSKU(preTaxProfitPerSKU, 0, sku.taxPerSKU);
  // } else {
  //   finalProfitPerSKU = await calcFinalProfitPerSKU(preTaxProfitPerSKU, newInsuranceFee);
  // }

  sku.isCostPriceSet = true;
  sku.insuranceFee = newInsuranceFee;
  sku.isInsuranceFeeIncluded = isInsuranceFeeIncluded;
  sku.finalProfitPerSKU = await calcFinalProfitPerSKU(sku.preTaxProfitPerSKU, 0, sku.taxPerSKU);
  sku.profitMargin = await calcProfitMargin(sku);

  var recalculatedPaidInsuranceFee = mandatoryInsuranceFee - sku.insuranceFee + newInsuranceFee;

  return { recalculatedPaidInsuranceFee, insuranceFeePercentage, skuWithCalculatedParams: sku };
};

module.exports = calcRestSKUParams;
