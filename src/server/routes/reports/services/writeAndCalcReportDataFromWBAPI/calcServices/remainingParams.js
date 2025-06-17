var shortNum = require("../shortNum");
var calcNetProfitMargin = require("./netProfitMargin");
var calcFinalNetProfitPerSKU = require("./finalNetProfitPerSKU");
var calcAverageFinalNetProfitPerSKU = require("./averageFinalNetProfitPerSKU");

var calcRemainingParams = async (sku, costPrice) => {
  var finalNetProfitPerSKU = await calcFinalNetProfitPerSKU(
    sku.netProfitPerSKU,
    sku.qty,
    costPrice
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
  sku.finalNetProfitPerSKU = await shortNum(finalNetProfitPerSKU);
  sku.averageFinalNetProfitPerSKU = await shortNum(averageFinalNetProfitPerSKU);

  return sku;
};

module.exports = calcRemainingParams;
