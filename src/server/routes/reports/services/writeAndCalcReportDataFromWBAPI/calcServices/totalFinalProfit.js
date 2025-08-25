const shortNum = require("../shortNum");

var calcTotalFinalProfit = async (skus) => {
  var totalFinalProfit = skus.reduce((acc, sku) => acc + sku.finalProfitPerSKU, 0);

  return await shortNum(totalFinalProfit);
};

module.exports = calcTotalFinalProfit;
