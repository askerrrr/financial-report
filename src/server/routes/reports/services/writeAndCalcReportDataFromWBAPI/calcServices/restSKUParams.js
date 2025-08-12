var shortNum = require("../shortNum");
var calcProfitMargin = require("./profitMargin");
var calcFinalProfitPerSKU = require("./finalProfitPerSKU");
var calcInsuranceFeePerSKU = require("./insuranceFeePerSKU");
var calcPreTaxProfitPerSKU = require("./preTaxProfitPerSKU");

var calcRestSKUParams = async (sku, costPrice, taxParams) => {
  var preTaxProfitPerSKU = await calcPreTaxProfitPerSKU(sku, costPrice);

  var { insuranceFeePercentage, paidTaxAmount, mandatoryInsuranceFee } = taxParams;

  var newInsuranceFee = await calcInsuranceFeePerSKU(preTaxProfitPerSKU, insuranceFeePercentage);

  var finalProfitPerSKU,
    isInsuranceFeeIncluded = true;

  // if (paidTaxAmount >= mandatoryInsuranceFee) {
  //   insuranceFeePercentage = 0;
  //   isInsuranceFeeIncluded = false;

  //   finalProfitPerSKU = await calcFinalProfitPerSKU(preTaxProfitPerSKU, 0, sku.taxPerSKU);
  // } else {
  //   finalProfitPerSKU = await calcFinalProfitPerSKU(preTaxProfitPerSKU, newInsuranceFee);
  // }

  finalProfitPerSKU = await calcFinalProfitPerSKU(preTaxProfitPerSKU, 0, sku.taxPerSKU);
  var profitMargin = await calcProfitMargin(sku.revenuePerSKU, finalProfitPerSKU);

  sku.isCostPriceSet = true;
  sku.insuranceFee = newInsuranceFee;
  sku.profitMargin = await shortNum(profitMargin);
  sku.isInsuranceFeeIncluded = isInsuranceFeeIncluded;
  sku.finalProfitPerSKU = await shortNum(finalProfitPerSKU);
  sku.preTaxProfitPerSKU = await shortNum(preTaxProfitPerSKU);

  var recalculatedPaidInsuranceFee = mandatoryInsuranceFee - sku.insuranceFee + newInsuranceFee;

  return { recalculatedPaidInsuranceFee, insuranceFeePercentage, skuWithCalculatedParams: sku };
};

module.exports = calcRestSKUParams;
