var shortNum = require("../shortNum");

var calcTotalFinalNetProfit = async (items) => {
  var totalFInalNetProfit = items.reduce(
    (acc, i) => acc + i.finalNetProfitPerItem,
    0
  );

  return await shortNum(totalFInalNetProfit);
};

module.exports = calcTotalFinalNetProfit;
