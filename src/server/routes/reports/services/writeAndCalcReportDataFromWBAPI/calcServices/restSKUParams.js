var shortNum = require("../shortNum");
var calcProfitMargin = require("./profitMargin");
var calcFinalProfitPerSKU = require("./finalProfitPerSKU");
var calcInsuranceFeePerSKU = require("./insuranceFeePerSKU");
var calcPreTaxProfitPerSKU = require("./preTaxProfitPerSKU");
var calcAverageFinalProfitPerSKU = require("./averageFinalProfitPerSKU");

var calcRestSKUParams = async (sku, costPrice, taxParams) => {
  var preTaxProfitPerSKU = await calcPreTaxProfitPerSKU(sku, costPrice);

  var { insuranceFeePercentage, paidTaxAmount, paidInsuranceFee } = taxParams;

  var newInsuranceFee = await calcInsuranceFeePerSKU(
    preTaxProfitPerSKU,
    insuranceFeePercentage
  );

  var finalProfitPerSKU;
  var isInsuranceFeeIncluded;

  if (paidTaxAmount >= paidInsuranceFee) {
    isInsuranceFeeIncluded = false;

    finalProfitPerSKU = await calcFinalProfitPerSKU(
      preTaxProfitPerSKU,
      0,
      sku.taxPerSKU
    );
  } else {
    isInsuranceFeeIncluded = true;

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

  sku.isCostPriceSet = true;
  sku.insuranceFee = newInsuranceFee;
  sku.profitMargin = await shortNum(profitMargin);
  sku.isInsuranceFeeIncluded = isInsuranceFeeIncluded;
  sku.finalProfitPerSKU = await shortNum(finalProfitPerSKU);
  sku.preTaxProfitPerSKU = await shortNum(preTaxProfitPerSKU);
  sku.averageFinalProfitPerSKU = await shortNum(averageFinalProfitPerSKU);

  var recalculatedPaidInsuranceFee =
    paidInsuranceFee - sku.insuranceFee + newInsuranceFee;

  return { recalculatedPaidInsuranceFee, skuWithCalculatedParams: sku };
};

module.exports = calcRestSKUParams;
