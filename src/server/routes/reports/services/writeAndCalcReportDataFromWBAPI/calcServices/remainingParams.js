var shortNum = require("../shortNum");
var calcNetProfitMargin = require("./netProfitMargin");
var calcInsuranceFeePerSKU = require("./insuranceFeePerSKU");
var calcFinalNetProfitPerSKU = require("./finalNetProfitPerSKU");
var calcAverageFinalNetProfitPerSKU = require("./averageFinalNetProfitPerSKU");

var calcRemainingParams = async (sku, costPrice, options) => {
  var finalNetProfitPerSKU = await calcFinalNetProfitPerSKU(sku, costPrice);

  var { insuranceFeePercentage } = options;

  var insuranceFee = await calcInsuranceFeePerSKU(
    finalNetProfitPerSKU,
    insuranceFeePercentage
  );

  var netProfitMargin = await calcNetProfitMargin(
    sku.revenuePerSKU,
    finalNetProfitPerSKU
  );

  var averageFinalNetProfitPerSKU = await calcAverageFinalNetProfitPerSKU(
    sku.qty,
    finalNetProfitPerSKU
  );

  sku.netProfitMargin = await shortNum(netProfitMargin);
  sku.finalNetProfitPerSKU = await shortNum(
    finalNetProfitPerSKU - insuranceFee
  );

  sku.insuranceFee = insuranceFee
  sku.averageFinalNetProfitPerSKU = await shortNum(averageFinalNetProfitPerSKU);

  return sku;
};

module.exports = calcRemainingParams;
