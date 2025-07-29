var shortNum = require("../shortNum");
var calcProfitMargin = require("./profitMargin");
var calcInsuranceFeePerSKU = require("./insuranceFeePerSKU");
var calcFinalProfitPerSKU = require("./finalProfitPerSKU");
var calcAverageFinalProfitPerSKU = require("./averageFinalProfitPerSKU");

var calcRemainingParams = async (sku, costPrice, taxParams) => {
  var finalProfitPerSKU = await calcFinalProfitPerSKU(sku, costPrice);

  var { insuranceFeePercentage } = taxParams;

  var insuranceFee = await calcInsuranceFeePerSKU(
    finalProfitPerSKU,
    insuranceFeePercentage
  );

  var profitMargin = await calcProfitMargin(
    sku.revenuePerSKU,
    finalProfitPerSKU
  );

  var averageFinalProfitPerSKU = await calcAverageFinalProfitPerSKU(
    sku.qty,
    finalProfitPerSKU
  );

  sku.profitMargin = await shortNum(profitMargin);
  sku.finalProfitPerSKU = await shortNum(finalProfitPerSKU - insuranceFee);

  sku.insuranceFee = insuranceFee;
  sku.averageFinalProfitPerSKU = await shortNum(averageFinalProfitPerSKU);

  return sku;
};

module.exports = calcRemainingParams;
