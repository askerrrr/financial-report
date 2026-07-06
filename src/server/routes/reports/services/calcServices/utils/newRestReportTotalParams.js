import sum from "./sum.js";
import calcProfitMargin from "./profitMargin.js";
import calcProductCosts from "./totalProductCosts.js";
import truncateNum from "../../reportParsing/truncateNum.js";

var calcRestReportTotalParams = (totals, prevSkuData, newSkuData, isCrossYearPeriod, postfix = "") => {
  if (isCrossYearPeriod) {
    //preTaxProfit
    var recalculatedPreTaxProfit =
      totals["totalPreTaxProfit" + postfix] - prevSkuData["preTaxProfit" + postfix] + newSkuData["preTaxProfit" + postfix];
    totals["totalPreTaxProfit" + postfix] = truncateNum(recalculatedPreTaxProfit);

    //finalProfit
    var recalculatedFinalProfit = totals["totalFinalProfit" + postfix] - prevSkuData["finalProfit" + postfix] + newSkuData["finalProfit" + postfix];
    totals["totalFinalProfit" + postfix] = truncateNum(recalculatedFinalProfit);

    //productCosts
    var recalculatedProductCosts =
      totals["totalProductCosts" + postfix] -
      prevSkuData["qty" + postfix] * prevSkuData["costPrice" + postfix] +
      newSkuData["qty" + postfix] * newSkuData["costPrice" + postfix];
    totals["totalProductCosts" + postfix] = truncateNum(recalculatedProductCosts);

    //insuranceFee
    var recalculatedInsuranceFee =
      totals["totalInsuranceFee" + postfix] - prevSkuData["insuranceFee" + postfix] + newSkuData["insuranceFee" + postfix];
    totals["totalInsuranceFee" + postfix] = truncateNum(recalculatedInsuranceFee);

    //otherExpenses
    var recalculatedOtherExpenses =
      totals["totalOtherExpenses" + postfix] - prevSkuData["otherExpenses" + postfix] + newSkuData["otherExpenses" + postfix];
    totals["totalOtherExpenses" + postfix] = truncateNum(recalculatedOtherExpenses);

    //margin
    totals["totalProfitMargin" + postfix] = calcProfitMargin(totals["totalFinalProfit" + postfix], totals["totalRetailAmount" + postfix]);

    //

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
