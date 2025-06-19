var calcProductCosts = require("./productCosts");
var calcTotalFinalNetProfit = require("./totalFinalNetProfit");
var calcTotalNetProfitMargin = require("./totalNetProfitMargin");

var calcRestTotalParams = async (rest, skus) => {
  rest.totalFinalNetProfit = await calcTotalFinalNetProfit(skus);

  rest.productCosts = await calcProductCosts(skus);

  rest.totalNetProfitMargin = await calcTotalNetProfitMargin(
    rest.totalRetailAmount,
    rest.totalFinalNetProfit
  );

  return { ...rest, skus };
};

module.exports = calcRestTotalParams;
