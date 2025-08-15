var totalRetailAmount = 0,
  totalRevenue = 0,
  totalSold = 0,
  totalDeliveryCost = 0,
  totalStorageCost = 0,
  totalPaidAcceptance = 0,
  totalFines = 0,
  totalDeductionOrPayment = 0,
  totalAdCampaignCosts = 0,
  totalProductsCosts = 0,
  totalTaxAmount = 0,
  totalProfitMargin = 0,
  totalFinalProfit = 0;

var getMonthlySummary = async (reports) => {
  for (var report of reports) {
    totalRetailAmount += report.totalRetailAmount;
    totalRevenue += report.totalRevenue;
    totalSold += report.totalSold;
    totalDeliveryCost += report.totalDeliveryCost;
    totalStorageCost += report.totalStorageCost;
    totalPaidAcceptance += report.totalPaidAcceptance;
    totalFines += report.totalFines;
    totalDeductionOrPayment += report.totalDeductionOrPayment;
    totalAdCampaignCosts += report.totalAdCampaignCosts;
    totalProductsCosts += report.productCosts;
    totalTaxAmount += report.totalTaxAmount;
    totalProfitMargin += report.totalProfitMargin;
    totalFinalProfit += report.totalFinalProfit;
  }

  return {
    reportId: reports[0].reportId,
    dateFrom: reports.at(-1).dateFrom,
    dateTo: reports[0].dateTo,
    totalRetailAmount,
    totalRevenue,
    totalSold,
    totalDeliveryCost,
    totalStorageCost,
    totalPaidAcceptance,
    totalFines,
    totalDeductionOrPayment,
    totalAdCampaignCosts,
    totalProductsCosts,
    totalTaxAmount,
    totalProfitMargin,
    totalFinalProfit,
  };
};

module.exports = getMonthlySummary;
