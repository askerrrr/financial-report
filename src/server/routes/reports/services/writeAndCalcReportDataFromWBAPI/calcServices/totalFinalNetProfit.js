var shortNum = require("../shortNum");

var calcTotalFinalNetProfit = async (skus) => {
  var totalFinalNetProfit = skus.reduce(
    (acc, sku) => acc + sku.finalNetProfitPerSKU,
    0
  );

  return await shortNum(totalFinalNetProfit);
};

module.exports = calcTotalFinalNetProfit;
