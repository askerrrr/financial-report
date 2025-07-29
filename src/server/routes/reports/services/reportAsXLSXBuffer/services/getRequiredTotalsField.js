var getRequiredTotalsField = async (totalValues) => {
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
    productCosts: totalValues.productCosts,
    totalTaxAmount: totalValues.totalTaxAmount,
    totalProfitMargin: totalValues.totalProfitMargin,
    totalFinalProfit: totalValues.totalFinalProfit,
  };
};

module.exports = getRequiredTotalsField;
