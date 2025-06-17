var calcTotalFinalNetProfit = require("./totalFinalNetProfit");
var calcTotalNetProfitMargin = require("./totalNetProfitMargin");

var calcRestTotalParams = async (rest, items) => {
  rest.totalFinalNetProfit = await calcTotalFinalNetProfit(items);

  rest.totalNetProfitMargin = await calcTotalNetProfitMargin(
    rest.totalRetailAmount,
    rest.totalFinalNetProfit
  );

  return { ...rest, items };
};

module.exports = calcRestTotalParams;
