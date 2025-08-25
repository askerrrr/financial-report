var getRequiredTotalsField = async (totalValues) => {
  return {
    reportId: totalValues.reportId,
    dateFrom: totalValues.dateFrom,
    dateTo: totalValues.dateTo,
    totalRetailAmount: totalValues.totalRetailAmount,
    totalSellerPayoutAmount: totalValues.totalSellerPayoutAmount,
    totalSold: totalValues.totalSold,
    totalDeliveryCost: totalValues.totalDeliveryCost,
    totalStorageCost: totalValues.totalStorageCost,
    totalPaidAcceptance: totalValues.totalPaidAcceptance,
    totalFines: totalValues.totalFines,
    totalDeductionOrPayment: totalValues.totalDeductionOrPayment,
    totalAdCampaignCosts: totalValues.totalAdCampaignCosts,
    totalProductCosts: totalValues.totalProductCosts,
    totalTaxAmount: totalValues.totalTaxAmount,
    totalProfitMargin: totalValues.totalProfitMargin,
    totalFinalProfit: totalValues.totalFinalProfit,
  };
};

module.exports = getRequiredTotalsField;
