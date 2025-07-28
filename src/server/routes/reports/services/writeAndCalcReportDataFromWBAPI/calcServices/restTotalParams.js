var calcProductCosts = require("./productCosts");
var calcTotalInsuranceFee = require("./totalInsuranceFee");
var calcTotalFinalNetProfit = require("./totalFinalNetProfit");
var calcTotalNetProfitMargin = require("./totalNetProfitMargin");

var calcRestTotalParams = async (totals, skus) => {
  totals.totalFinalNetProfit = await calcTotalFinalNetProfit(skus);

  totals.productCosts = await calcProductCosts(skus);

  totals.totalInsuranceFee = await calcTotalInsuranceFee(skus);

  totals.totalNetProfitMargin = await calcTotalNetProfitMargin(
    totals.totalRetailAmount,
    totals.totalFinalNetProfit
  );

  return { ...totals, skus };
};

module.exports = calcRestTotalParams;
