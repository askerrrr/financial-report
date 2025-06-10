var shortNum = require("../shortNum");

var calcTotalNetProfitMargin = async (totalRetailAmount, totalNetProfit) => {
  if (typeof totalNetProfit !== "number" || totalNetProfit == 0) {
    return "Расчет только после ввода себестоимости";
  }

  var totalNetProfitMargin = (totalNetProfit * 100) / totalRetailAmount;

  return await shortNum(totalNetProfitMargin);
};

module.exports = calcTotalNetProfitMargin;
