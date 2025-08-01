var shortNum = require("../shortNum");
var calcProfitMargin = require("./profitMargin");
var calcFinalProfitPerSKU = require("./finalProfitPerSKU");
var calcInsuranceFeePerSKU = require("./insuranceFeePerSKU");
var calcPreTaxProfitPerSKU = require("./preTaxProfitPerSKU");
var calcAverageFinalProfitPerSKU = require("./averageFinalProfitPerSKU");

var calcRemainingParams = async (sku, costPrice, taxParams) => {
  var preTaxProfitPerSKU = await calcPreTaxProfitPerSKU(sku, costPrice);

  var { insuranceFeePercentage, paidTaxAmount, paidInsuranceFee } = taxParams;

  var insuranceFee = await calcInsuranceFeePerSKU(
    preTaxProfitPerSKU,
    insuranceFeePercentage
  );

  var finalProfitPerSKU;

  // if (paidTaxAmount > paidInsuranceFee) {
  //   finalProfitPerSKU = await calcFinalProfitPerSKU(
  //     preTaxProfitPerSKU,
  //     insuranceFee,
  //     sku.taxPerSKU
  //   );
  // }

  finalProfitPerSKU = await calcFinalProfitPerSKU(
    preTaxProfitPerSKU,
    sku.taxPerSKU
  );

  var profitMargin = await calcProfitMargin(
    sku.revenuePerSKU,
    finalProfitPerSKU
  );

  var averageFinalProfitPerSKU = await calcAverageFinalProfitPerSKU(
    sku.qty,
    finalProfitPerSKU
  );

  sku.insuranceFee = insuranceFee;
  sku.profitMargin = await shortNum(profitMargin);
  sku.finalProfitPerSKU = await shortNum(finalProfitPerSKU);
  sku.preTaxProfitPerSKU = await shortNum(preTaxProfitPerSKU);
  sku.averageFinalProfitPerSKU = await shortNum(averageFinalProfitPerSKU);

  return sku;
};

module.exports = calcRemainingParams;
