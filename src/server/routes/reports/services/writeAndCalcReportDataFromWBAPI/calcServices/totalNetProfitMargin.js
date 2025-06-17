var shortNum = require("../shortNum");

var calcTotalNetProfitMargin = async (totalRetailAmount, totalNetProfit) => {
  if (totalNetProfit === 0 || totalNetProfit === 0) {
    return 0;
  }

  var totalNetProfitMargin = (totalNetProfit * 100) / totalRetailAmount;

  return await shortNum(totalNetProfitMargin);
};

module.exports = calcTotalNetProfitMargin;
