var sum = require("./sum");
var calcProductCosts = require("./totalProductCosts");
var calcTotalProfitMargin = require("./totalProfitMargin");

var calcRestReportTotalParams = (totals, skus, isCrossYearReport) => {
  totals.totalPreTaxProfit = sum(skus, "preTaxProfit", "truncate-on");
  totals.totalFinalProfit = sum(skus, "finalProfit", "truncate-on");
  totals.totalProductCosts = calcProductCosts(skus);
  totals.totalInsuranceFee = sum(skus, "insuranceFee");
  totals.totalProfitMargin = calcTotalProfitMargin(totals);

  if (isCrossYearReport) {
    totals.totalFinalProfitInCurrentYear = skus.reduce(
      (acc, i) => acc + i.finalProfitInCurrentYear,
      0
    );

    totals.totalFinalProfitInNextYear = skus.reduce((acc, i) => acc + i.finalProfitInNextYear, 0);

    totals.totalInsuranceFeeInCurrentYear = skus.reduce(
      (acc, i) => acc + i.insuranceFeeInCurrentYear,
      0
    );

    totals.totalInsuranceFeeInNextYear = skus.reduce((acc, i) => acc + i.insuranceFeeInNextYear, 0);

    totals.totalProfitMarginInCurrentYear =
      skus.reduce((acc, i) => acc + i.profitMarginInCurrentYear, 0) / skus.length;

    totals.totalProfitMarginInNextYear =
      skus.reduce((acc, i) => acc + i.profitMarginInNextYear, 0) / skus.length;

    totals.totalProfitMargin =
      (totals.totalProfitMarginInCurrentYear + totals.totalProfitMarginInNextYear) / 2;
  } else {
    totals.totalProfitMargin = calcTotalProfitMargin(totals);
  }

  return { ...totals, skus };
};

module.exports = calcRestReportTotalParams;
