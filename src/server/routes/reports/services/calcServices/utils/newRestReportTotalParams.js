import sum from "./sum.js";
import calcProfitMargin from "./profitMargin.js";
import calcProductCosts from "./totalProductCosts.js";
import truncateNum from "../../reportParsing/truncateNum.js";

var calcRestReportTotalParams = (totals, prevSkuData, newSkuData, isCrossYearPeriod) => {
  if (isCrossYearPeriod) {
    var recalculatedTotalPreTaxProfitInCurrentYear = totals.totalPreTaxProfitInCurrentYear - prevSkuData.preTaxProfitInCurrentYear + newSkuData.preTaxProfitInCurrentYear;
    totals.totalPreTaxProfitInCurrentYear = truncateNum(recalculatedTotalPreTaxProfitInCurrentYear);

    var recalculatedTotalFinalProfitInCurrentYear = totals.totalFinalProfitInCurrentYear - prevSkuData.finalProfitInCurrentYear + newSkuData.finalProfitInCurrentYear;
    totals.totalFinalProfitInCurrentYear = truncateNum(recalculatedTotalFinalProfitInCurrentYear);

    var recalculatedTotalProductCostsInCurrentYear =
      totals.totalProductCostsInCurrentYear - prevSkuData.costPrice * prevSkuData.qtyInCurrentYear + newSkuData.costPrice * newSkuData.qtyInCurrentYear;
    totals.totalProductCostsInCurrentYear = truncateNum(recalculatedTotalProductCostsInCurrentYear);

    var recalculatedTotalInsuranceFeeInCurrentYear = totals.totalInsuranceFeeInCurrentYear - prevSkuData.insuranceFeeInCurrentYear + newSkuData.insuranceFeeInCurrentYear;
    totals.totalInsuranceFeeInCurrentYear = truncateNum(recalculatedTotalInsuranceFeeInCurrentYear);

    var recalculatedTotalOtherExpensesInCurrentYear = totals.totalOtherExpensesInCurrentYear - prevSkuData.otherExpensesInCurrentYear + newSkuData.otherExpensesInCurrentYear;
    totals.totalOtherExpensesInCurrentYear = truncateNum(recalculatedTotalOtherExpensesInCurrentYear);

    totals.totalProfitMarginInCurrentYear = calcProfitMargin(recalculatedTotalFinalProfitInCurrentYear, totals.totalRetailAmountInCurrentYear);
    var recalculatedTotalPreTaxProfitInNextYear = totals.totalPreTaxProfitInNextYear - prevSkuData.preTaxProfitInNextYear + newSkuData.preTaxProfitInNextYear;
    totals.totalPreTaxProfitInNextYear = truncateNum(recalculatedTotalPreTaxProfitInNextYear);

    var recalculatedTotalFinalProfitInNextYear = totals.totalFinalProfitInNextYear - prevSkuData.finalProfitInNextYear + newSkuData.finalProfitInNextYear;
    totals.totalFinalProfitInNextYear = truncateNum(recalculatedTotalFinalProfitInNextYear);

    var recalculatedTotalProductCostsInNextYear =
      totals.totalProductCostsInNextYear - prevSkuData.costPrice * prevSkuData.qtyInNextYear + newSkuData.costPrice * newSkuData.qtyInNextYear;
    totals.totalProductCostsInNextYear = truncateNum(recalculatedTotalProductCostsInNextYear);

    var recalculatedTotalInsuranceFeeInNextYear = totals.totalInsuranceFeeInNextYear - prevSkuData.insuranceFeeInNextYear + newSkuData.insuranceFeeInNextYear;
    totals.totalInsuranceFeeInNextYear = truncateNum(recalculatedTotalInsuranceFeeInNextYear);

    var recalculatedTotalOtherExpensesInNextYear = totals.totalOtherExpensesInNextYear - prevSkuData.otherExpensesInNextYear + newSkuData.otherExpensesInNextYear;
    totals.totalOtherExpensesInNextYear = truncateNum(recalculatedTotalOtherExpensesInNextYear);

    totals.totalProfitMarginInNextYear = calcProfitMargin(recalculatedTotalFinalProfitInNextYear, totals.totalRetailAmountInNextYear);

    var recalculatedTotalPreTaxProfit = totals.totalPreTaxProfitInCurrentYear + totals.totalPreTaxProfitInNextYear;
    totals.totalPreTaxProfit = truncateNum(recalculatedTotalPreTaxProfit);

    var recalculatedTotalFinalProfit = totals.totalFinalProfitInCurrentYear + totals.totalFinalProfitInNextYear;
    totals.totalFinalProfit = truncateNum(recalculatedTotalFinalProfit);

    var recalculatedTotalProductCosts = totals.totalProductCostsInCurrentYear + totals.totalProductCostsInNextYear;
    totals.totalProductCosts = truncateNum(recalculatedTotalProductCosts);

    var recalculatedTotalInsuranceFee = totals.totalInsuranceFeeInCurrentYear + totals.totalInsuranceFeeInNextYear;
    totals.totalInsuranceFee = truncateNum(recalculatedTotalInsuranceFee);

    var recalculatedTotalOtherExpenses = totals.totalOtherExpensesInCurrentYear + totals.totalOtherExpensesInNextYear;
    totals.totalOtherExpenses = truncateNum(recalculatedTotalOtherExpenses);
  } else {
    var recalculatedTotalPreTaxProfit = totals.totalPreTaxProfit - prevSkuData.preTaxProfit + newSkuData.preTaxProfit;
    totals.totalPreTaxProfit = truncateNum(recalculatedTotalPreTaxProfit);

    var recalculatedTotalFinalProfit = totals.totalFinalProfit - prevSkuData.finalProfit + newSkuData.finalProfit;
    totals.totalFinalProfit = truncateNum(recalculatedTotalFinalProfit);

    var recalculatedTotalProductCosts = totals.totalProductCosts - prevSkuData.costPrice * prevSkuData.qty + newSkuData.costPrice * newSkuData.qty;
    totals.totalProductCosts = truncateNum(recalculatedTotalProductCosts);

    var recalculatedTotalInsuranceFee = totals.totalInsuranceFee - prevSkuData.insuranceFee + newSkuData.insuranceFee;
    totals.totalInsuranceFee = truncateNum(recalculatedTotalInsuranceFee);

    var recalculatedTotalOtherExpenses = totals.totalOtherExpenses - prevSkuData.otherExpenses + newSkuData.otherExpenses;
    totals.totalOtherExpenses = truncateNum(recalculatedTotalOtherExpenses);
  }

  totals.totalProfitMargin = calcProfitMargin(totals.totalFinalProfit, totals.totalRetailAmount);

  return { updatedTotals: totals };
};

export default calcRestReportTotalParams;
