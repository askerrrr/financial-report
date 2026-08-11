var getPrevTotalsData = (totals) => {
  var prevData = {};

  prevData.totalFinalProfit = totals.totalFinalProfit;
  prevData.totalProfitMargin = totals.totalProfitMargin;
  prevData.totalInsuranceFee = totals.totalInsuranceFee;
  prevData.totalOtherExpenses = totals.totalOtherExpenses;

  if (totals.isCrossYearPeriod) {
    prevData.totalFinalProfitInCurrentYear = totals.totalFinalProfitInCurrentYear;
    prevData.totalProfitMarginInCurrentYear = totals.totalProfitMarginInCurrentYear;
    prevData.totalInsuranceFeeInCurrentYear = totals.totalInsuranceFeeInCurrentYear;
    prevData.totalOtherExpensesInCurrentYear = totals.totalOtherExpensesInCurrentYear;

    prevData.totalFinalProfitInNextYear = totals.totalFinalProfitInNextYear;
    prevData.totalProfitMarginInNextYear = totals.totalProfitMarginInNextYear;
    prevData.totalInsuranceFeeInNextYear = totals.totalInsuranceFeeInNextYear;
    prevData.totalOtherExpensesInNextYear = totals.totalOtherExpensesInNextYear;
  }

  return prevData;
};

export default getPrevTotalsData;
