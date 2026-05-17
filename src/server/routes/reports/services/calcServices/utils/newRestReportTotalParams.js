import sum from "./sum.js";
import calcProfitMargin from "./profitMargin.js";
import calcProductCosts from "./totalProductCosts.js";
import truncateNum from "../../reportParsing/truncateNum.js";

var calcRestReportTotalParams = (totals, oldSkuData, newSkuData, isCrossYearReport) => {
  var recalculatedTotalPreTaxProfit = totals.totalPreTaxProfit - oldSkuData.preTaxProfit + newSkuData.preTaxProfit;
  totals.totalPreTaxProfit = truncateNum(recalculatedTotalPreTaxProfit);

  var recalculatedTotalFinalProfit = totals.totalFinalProfit - oldSkuData.finalProfit + newSkuData.finalProfit;
  totals.totalFinalProfit = truncateNum(recalculatedTotalFinalProfit);

  var recalculatedTotalProductCosts = totals.totalProductCosts - oldSkuData.costPrice * oldSkuData.qty + newSkuData.costPrice * newSkuData.qty;
  totals.totalProductCosts = truncateNum(recalculatedTotalProductCosts);

  var recalculatedTotalInsuranceFee = totals.totalInsuranceFee - oldSkuData.insuranceFee + newSkuData.insuranceFee;
  totals.totalInsuranceFee = truncateNum(recalculatedTotalInsuranceFee);

  var recalculatedTotalOtherExpenses = totals.totalOtherExpenses - oldSkuData.otherExpenses + newSkuData.otherExpenses;
  totals.totalOtherExpenses = truncateNum(recalculatedTotalOtherExpenses);

  if (isCrossYearReport) {
    var recalculatedTotalPreTaxProfitInCurrentYear =
      totals.totalPreTaxProfitInCurrentYear - oldSkuData.preTaxProfitInCurrentYear + newSkuData.preTaxProfitInCurrentYear;
    totals.totalPreTaxProfitInCurrentYear = truncateNum(recalculatedTotalPreTaxProfitInCurrentYear);

    var recalculatedTotalFinalProfitInCurrentYear =
      totals.totalFinalProfitInCurrentYear - oldSkuData.finalProfitInCurrentYear + newSkuData.finalProfitInCurrentYear;
    totals.totalFinalProfitInCurrentYear = truncateNum(recalculatedTotalFinalProfitInCurrentYear);

    var recalculatedTotalProductCostsInCurrentYear =
      totals.totalProductCostsInCurrentYear - oldSkuData.costPrice * oldSkuData.qtyInCurrentYear + newSkuData.costPrice * newSkuData.qtyInCurrentYear;
    totals.totalProductCostsInCurrentYear = truncateNum(recalculatedTotalProductCostsInCurrentYear);

    var recalculatedTotalInsuranceFeeInCurrentYear =
      totals.totalInsuranceFeeInCurrentYear - oldSkuData.insuranceFeeInCurrentYear + newSkuData.insuranceFeeInCurrentYear;
    totals.totalInsuranceFeeInCurrentYear = truncateNum(recalculatedTotalInsuranceFeeInCurrentYear);

    var recalculatedTotalOtherExpensesInCurrentYear =
      totals.totalOtherExpensesInCurrentYear - oldSkuData.otherExpensesInCurrentYear + newSkuData.otherExpensesInCurrentYear;
    totals.totalOtherExpensesInCurrentYear = truncateNum(recalculatedTotalOtherExpensesInCurrentYear);

    var recalculatedTotalPreTaxProfitInNextYear =
      totals.totalPreTaxProfitInNextYear - oldSkuData.preTaxProfitInNextYear + newSkuData.preTaxProfitInNextYear;
    totals.totalPreTaxProfitInNextYear = truncateNum(recalculatedTotalPreTaxProfitInNextYear);

    var recalculatedTotalFinalProfitInNextYear =
      totals.totalFinalProfitInNextYear - oldSkuData.finalProfitInNextYear + newSkuData.finalProfitInNextYear;
    totals.totalFinalProfitInNextYear = truncateNum(recalculatedTotalFinalProfitInNextYear);

    var recalculatedTotalProductCostsInNextYear =
      totals.totalProductCostsInNextYear - oldSkuData.costPrice * oldSkuData.qtyInNextYear + newSkuData.costPrice * newSkuData.qtyInNextYear;
    totals.totalProductCostsInNextYear = truncateNum(recalculatedTotalProductCostsInNextYear);

    var recalculatedTotalInsuranceFeeInNextYear =
      totals.totalInsuranceFeeInNextYear - oldSkuData.insuranceFeeInNextYear + newSkuData.insuranceFeeInNextYear;
    totals.totalInsuranceFeeInNextYear = truncateNum(recalculatedTotalInsuranceFeeInNextYear);

    var recalculatedTotalOtherExpensesInNextYear =
      totals.totalOtherExpensesInNextYear - oldSkuData.otherExpensesInNextYear + newSkuData.otherExpensesInNextYear;
    totals.totalOtherExpensesInNextYear = truncateNum(recalculatedTotalOtherExpensesInNextYear);

    totals.totalProfitMarginInCurrentYear = calcProfitMargin(totals.totalFinalProfitInCurrentYear, totals.totalRetailAmountInCurrentYear);

    totals.totalProfitMarginInNextYear = calcProfitMargin(totals.totalFinalProfitInNextYear, totals.totalRetailAmountInNextYear);

    totals.totalProfitMargin = (totals.totalProfitMarginInCurrentYear + totals.totalProfitMarginInNextYear) / 2;
  } else {
    totals.totalProfitMargin = calcProfitMargin(totals.totalFinalProfit, totals.totalRetailAmount);
  }

  return { updatedTotals: totals };
};

export default calcRestReportTotalParams;
