var shortNum = require("../shortNum");

var calcTotalNetProfitMargin = async (
  totalRetailAmount,
  totalFinalNetProfit
) => {
  if (totalFinalNetProfit === 0 || totalNetProfit === 0) {
    return 0;
  }

  var totalNetProfitMargin = (totalFinalNetProfit * 100) / totalRetailAmount;

  return await shortNum(totalNetProfitMargin);
};

module.exports = calcTotalNetProfitMargin;
