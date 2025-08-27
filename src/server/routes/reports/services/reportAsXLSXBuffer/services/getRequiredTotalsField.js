var getRequiredTotalsField = async (totalValues) => {
  return {
    reportId: totalValues.reportId,
    dateFrom: totalValues.dateFrom,
    dateTo: totalValues.dateTo,
    totalRetailAmount: totalValues.totalRetailAmount,
    totalSellerPayoutAmount: totalValues.totalSellerPayoutAmount,
    totalSold: totalValues.totalSold,
    totalReturnAmount: totalValues.totalReturnAmount,
    totalDeliveryCost: totalValues.totalDeliveryCost,
    totalStorageCost: totalValues.totalStorageCost,
    totalPaidAcceptance: totalValues.totalPaidAcceptance,
    totalFines: totalValues.totalFines,
    totalDeductionOrPayment: totalValues.totalDeductionOrPayment,
    totalAdvertisingCosts: totalValues.totalAdvertisingCosts,
    totalProductCosts: totalValues.totalProductCosts,
    totalTaxAmount: totalValues.totalTaxAmount,
    totalProfitMargin: totalValues.totalProfitMargin,
    totalFinalProfit: totalValues.totalFinalProfit,
  };
};

module.exports = getRequiredTotalsField;
