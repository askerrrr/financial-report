import getZeroedReportTotals from "./getZeroedReportTotals.js";

var getMonthlySummary = async (reports, totalPropPostfix = "") => {
  var monthlySummary = getZeroedReportTotals();

  var { dateFrom, dateTo } = reports[0];

  if (totalPropPostfix) {
    var currentYearPostfix = "InCurrentYear";

    if (totalPropPostfix === currentYearPostfix) {
      var startYear = dateFrom.split("-")[0];

      monthlySummary.dateFrom = dateFrom;
      monthlySummary.dateTo = startYear + "-12-31";
    } else {
      var nextYear = dateTo.split("-")[0];
      monthlySummary.dateFrom = nextYear + "-01-01";
      monthlySummary.dateTo = dateTo;
    }
  } else {
    monthlySummary.dateFrom = dateFrom;
    monthlySummary.dateTo = dateTo;
  }

  for (var report of reports) {
    monthlySummary.reportIds += report.reportId + "; ";
    monthlySummary.totalRetailAmount += report["totalRetailAmount" + totalPropPostfix];
    monthlySummary.totalSellerPayoutAmount += report["totalSellerPayoutAmount" + totalPropPostfix];
    monthlySummary.totalSold += report["totalSold" + totalPropPostfix];
    monthlySummary.totalReturnAmount += report["totalReturnAmount" + totalPropPostfix];
    monthlySummary.totalDeliveryCost += report["totalDeliveryCost" + totalPropPostfix];
    monthlySummary.totalStorageCost += report["totalStorageCost" + totalPropPostfix];
    monthlySummary.totalPaidAcceptance += report["totalPaidAcceptance" + totalPropPostfix];
    monthlySummary.totalFines += report["totalFines" + totalPropPostfix];
    monthlySummary.totalOtherExpenses += report["totalOtherExpenses" + totalPropPostfix];
    monthlySummary.totalDeductionOrPayment += report["totalDeductionOrPayment" + totalPropPostfix];
    monthlySummary.totalAdvertisingCosts += report["totalAdvertisingCosts" + totalPropPostfix];
    monthlySummary.totalProductsCosts += report["totalProductCosts" + totalPropPostfix] ?? 0;
    monthlySummary.totalTaxableAmount += report["totalTaxableAmount" + totalPropPostfix];
    monthlySummary.totalTaxAmount += report["totalTaxAmount" + totalPropPostfix];
    monthlySummary.totalProfitMargin += report["totalProfitMargin" + totalPropPostfix] ?? 0;
    monthlySummary.totalFinalProfit += report["totalFinalProfit" + totalPropPostfix];
  }

  return monthlySummary;
};

export default getMonthlySummary;
