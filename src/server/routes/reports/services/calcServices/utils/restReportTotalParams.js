var sum = require("./sum");
var calcProductCosts = require("./totalProductCosts");
var calcTotalProfitMargin = require("./totalProfitMargin");

var calcRestReportTotalParams = (totals, skus) => {
  totals.totalPreTaxProfit = sum(skus, "preTaxProfit").truncate();
  totals.totalFinalProfit = sum(skus, "finalProfit").truncate();
  totals.totalProductCosts = calcProductCosts(skus);
  totals.totalInsuranceFee = sum(skus, "insuranceFee");
  totals.totalProfitMargin = calcTotalProfitMargin(totals).truncate();

  return { ...totals, skus };
};

module.exports = calcRestReportTotalParams;
