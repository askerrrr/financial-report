var getMonthlySummary = async (reports) => {
  var reportIds = "";
  var totalRetailAmount = 0,
    totalSellerPayoutAmount = 0,
    totalSold = 0,
    totalDeliveryCost = 0,
    totalStorageCost = 0,
    totalPaidAcceptance = 0,
    totalFines = 0,
    totalDeductionOrPayment = 0,
    totalAdvertisingCosts = 0,
    totalOtherExpenses = 0,
    totalProductsCosts = 0,
    totalTaxableAmount = 0,
    totalTaxAmount = 0,
    totalProfitMargin = 0,
    totalFinalProfit = 0,
    totalReturnAmount = 0;

  for (var report of reports) {
    reportIds += report.reportId + "; ";
    totalRetailAmount += report.totalRetailAmount;
    totalSellerPayoutAmount += report.totalSellerPayoutAmount;
    totalSold += report.totalSold;
    totalReturnAmount += report.totalReturnAmount;
    totalDeliveryCost += report.totalDeliveryCost;
    totalStorageCost += report.totalStorageCost;
    totalPaidAcceptance += report.totalPaidAcceptance;
    totalFines += report.totalFines;
    totalOtherExpenses += report.totalOtherExpenses;
    totalDeductionOrPayment += report.totalDeductionOrPayment;
    totalAdvertisingCosts += report.totalAdvertisingCosts;
    totalProductsCosts += report.totalProductCosts;
    totalTaxableAmount += report.totalTaxableAmount;
    totalTaxAmount += report.totalTaxAmount;
    totalProfitMargin += report.totalProfitMargin;
    totalFinalProfit += report.totalFinalProfit;
  }

  return {
    reportId: reportIds,
    dateFrom: reports.at(-1).dateFrom,
    dateTo: reports[0].dateTo,
    totalRetailAmount,
    totalSellerPayoutAmount,
    totalSold,
    totalReturnAmount,
    totalDeliveryCost,
    totalStorageCost,
    totalPaidAcceptance,
    totalFines,
    totalOtherExpenses,
    totalDeductionOrPayment,
    totalAdvertisingCosts,
    totalProductsCosts,
    totalTaxableAmount,
    totalTaxAmount,
    totalProfitMargin,
    totalFinalProfit,
  };
};

export default getMonthlySummary;
