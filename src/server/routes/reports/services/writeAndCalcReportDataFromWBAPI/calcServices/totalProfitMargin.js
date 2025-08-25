var shortNum = require("../shortNum");

var calcTotalProfitMargin = async (totalRetailAmount, totalFinalProfit) => {
  if (totalFinalProfit === 0 || totalRetailAmount === 0) {
    return 0;
  }

  var totalProfitMargin = (totalFinalProfit * 100) / totalRetailAmount;

  return await shortNum(totalProfitMargin);
};

module.exports = calcTotalProfitMargin;
