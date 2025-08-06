var shortNum = require("../shortNum");
var calcProfitMargin = require("./profitMargin");
var calcFinalProfitPerSKU = require("./finalProfitPerSKU");
var calcInsuranceFeePerSKU = require("./insuranceFeePerSKU");
var calcPreTaxProfitPerSKU = require("./preTaxProfitPerSKU");
var calcAverageFinalProfitPerSKU = require("./averageFinalProfitPerSKU");

var calcRestSKUParams = async (sku, costPrice, taxParams) => {
  var preTaxProfitPerSKU = await calcPreTaxProfitPerSKU(sku, costPrice);

  var { insuranceFeePercentage, paidTaxAmount, paidInsuranceFee } = taxParams;

  var finalProfitPerSKU, newInsuranceFee;

  if (paidTaxAmount >= paidInsuranceFee) {
    newInsuranceFee = 0;

    finalProfitPerSKU = await calcFinalProfitPerSKU(
      preTaxProfitPerSKU,
      newInsuranceFee,
      sku.taxPerSKU
    );
  } else {
    newInsuranceFee = await calcInsuranceFeePerSKU(
      preTaxProfitPerSKU,
      insuranceFeePercentage
    );

    finalProfitPerSKU = await calcFinalProfitPerSKU(
      preTaxProfitPerSKU,
      newInsuranceFee,
      sku.taxPerSKU
    );
  }

  var profitMargin = await calcProfitMargin(
    sku.revenuePerSKU,
    finalProfitPerSKU
  );

  var averageFinalProfitPerSKU = await calcAverageFinalProfitPerSKU(
    sku.qty,
    finalProfitPerSKU
  );

  sku.insuranceFee = newInsuranceFee;
  sku.profitMargin = await shortNum(profitMargin);
  sku.finalProfitPerSKU = await shortNum(finalProfitPerSKU);
  sku.preTaxProfitPerSKU = await shortNum(preTaxProfitPerSKU);
  sku.averageFinalProfitPerSKU = await shortNum(averageFinalProfitPerSKU);

  var recalculatedPaidInsuranceFee =
    paidInsuranceFee - sku.insuranceFee + newInsuranceFee;

  var skuWithCalculatedParams = sku;
  return { skuWithCalculatedParams, recalculatedPaidInsuranceFee };
};

module.exports = calcRestSKUParams;
