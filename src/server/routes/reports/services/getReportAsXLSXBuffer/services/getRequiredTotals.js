var getRequiredTotals = async (totalValues) => {
  return {
    reportId: totalValues.reportId,
    dateFrom: totalValues.dateFrom,
    dateTo: totalValues.dateTo,
    totalRetailAmount: totalValues.totalRetailAmount,
    totalRevenue: totalValues.totalRevenue,
    totalDeliveryCost: totalValues.totalDeliveryCost,
    totalStorageCost: totalValues.totalStorageCost,
    totalPaidAcceptance: totalValues.totalPaidAcceptance,
    totalFines: totalValues.totalFines,
    totalDeductionOrPayment: totalValues.totalDeductionOrPayment,
    totalAdCampaignCosts: totalValues.totalAdCampaignCosts,
    totalTaxAmount: totalValues.totalTaxAmount,
    totalNetProfitMargin: totalValues.totalNetProfitMargin,
    totalFinalNetProfit: totalValues.totalFinalNetProfit,
  };
};

module.exports = getRequiredTotals;
