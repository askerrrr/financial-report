var shortNum = require("../shortNum");

var calcTotalFinalNetProfit = async (skus) => {
  var totalFInalNetProfit = skus.reduce(
    (acc, sku) => acc + sku.finalNetProfitPerItem,
    0
  );

  return await shortNum(totalFInalNetProfit);
};

module.exports = calcTotalFinalNetProfit;
