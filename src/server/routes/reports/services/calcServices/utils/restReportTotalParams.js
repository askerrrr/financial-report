var sum = require("./sum");
var calcProductCosts = require("./totalProductCosts");
var calcTotalProfitMargin = require("./totalProfitMargin");

var calcRestReportTotalParams = (totals, skus) => {
  totals.totalPreTaxProfit = sum(skus, "preTaxProfit", 'truncate-on');
  totals.totalFinalProfit = sum(skus, "finalProfit", 'truncate-on');
  totals.totalProductCosts = calcProductCosts(skus);
  totals.totalInsuranceFee = sum(skus, "insuranceFee");
  totals.totalProfitMargin = calcTotalProfitMargin(totals);

  return { ...totals, skus };
};

module.exports = calcRestReportTotalParams;
