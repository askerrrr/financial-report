import truncateNum from "../reportParsing/truncateNum.js";

var recalculateTaxParams = (taxParams, prevReportTotals, currentReportTotals, postfix = "") => {
  var recalculatedFinalProfit =
    taxParams.finalProfit - prevReportTotals["totalFinalProfit" + postfix] + currentReportTotals["totalFinalProfit" + postfix];

  var recalculatedOtherExpenses =
    taxParams.otherExpenses - prevReportTotals["totalOtherExpenses" + postfix] + currentReportTotals["totalOtherExpenses" + postfix];

  var recalculatedInsuranceFee =
    taxParams.paidInsuranceFee - prevReportTotals["totalInsuranceFee" + postfix] + currentReportTotals["totalInsuranceFee" + postfix];

  taxParams.finalProfit = truncateNum(recalculatedFinalProfit);
  taxParams.otherExpenses = truncateNum(recalculatedOtherExpenses);
  taxParams.paidInsuranceFee = truncateNum(recalculatedInsuranceFee);

  return { recalculatedTaxParams: taxParams };
};

export default recalculateTaxParams;
