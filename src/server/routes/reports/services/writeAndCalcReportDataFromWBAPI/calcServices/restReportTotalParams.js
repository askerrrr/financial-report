var calcProductCosts = require("./totalProductCosts");
var calcTotalInsuranceFee = require("./totalInsuranceFee");
var calcTotalFinalProfit = require("./totalFinalProfit");
var calcTotalProfitMargin = require("./totalProfitMargin");
var calcTotalPreTaxProfit = require("./totalPreTaxProfit");

var calcRestReportTotalParams = async (totals, skus) => {
  totals.totalPreTaxProfit = await calcTotalPreTaxProfit(skus);

  totals.totalFinalProfit = await calcTotalFinalProfit(skus);

  totals.totalProductCosts = await calcProductCosts(skus);

  totals.totalInsuranceFee = await calcTotalInsuranceFee(skus);

  totals.totalProfitMargin = await calcTotalProfitMargin(totals.totalRetailAmount, totals.totalFinalProfit);

  return { ...totals, skus };
};

module.exports = calcRestReportTotalParams;
