var shortNum = require("../shortNum");

var calcTotalFinalNetProfit = async (skus) => {
  var totalFInalNetProfit = skus.reduce(
    (acc, i) => acc + i.finalNetProfitPerItem,
    0
  );

  return await shortNum(totalFInalNetProfit);
};

module.exports = calcTotalFinalNetProfit;
