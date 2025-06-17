var calcTotalFinalNetProfit = require("./calcTotalFinalNetProfit");
var calcTotalNetProfitMargin = require("./calcTotalNetProfitMargin");

var calcRestTotalParams = async (rest, items) => {
  rest.totalFinalNetProfit = await calcTotalFinalNetProfit(items);

  rest.totalNetProfitMargin = await calcTotalNetProfitMargin(
    rest.totalRetailAmount,
    rest.totalFinalNetProfit
  );

  return { ...rest, items };
};

module.exports = calcRestTotalParams;
