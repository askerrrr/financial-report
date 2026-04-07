var getRequiredTotalsField = async (report) => {
  return {
    reportId: report.reportId,
    dateFrom: report.dateFrom,
    dateTo: report.dateTo,
    totalRetailAmount: report.totalRetailAmount,
    totalSellerPayoutAmount: report.totalSellerPayoutAmount,
    totalSold: report.totalSold,
    totalReturnAmount: report.totalReturnAmount,
    totalDeliveryCost: report.totalDeliveryCost,
    totalStorageCost: report.totalStorageCost,
    totalPaidAcceptance: report.totalPaidAcceptance,
    totalFines: report.totalFines,
    totalDeductionOrPayment: report.totalDeductionOrPayment,
    totalAdvertisingCosts: report.totalAdvertisingCosts,
    totalProductCosts: report.totalProductCosts,
    totalOtherExpenses: report.totalOtherExpenses,
    totalTaxableAmount: report.totalTaxableAmount,
    totalTaxAmount: report.totalTaxAmount,
    totalInsuranceFee: report.totalInsuranceFee,
    totalAdditionalInsuranceFee: report.totalAdditionalInsuranceFee,
    totalProfitMargin: report.totalProfitMargin,
    totalFinalProfit: report.totalFinalProfit,
  };
};

export default getRequiredTotalsField;
