import createTdElement from "./services/createTdElement.js";

var tbody = document.getElementById("totals-tbody");
var tr = document.createElement("tr");

var createTotalsTable = async (report) => {
  var totalRetailAmountTd = createTdElement(report.totalRetailAmount);
  var totalSellerPayoutAmountTd = createTdElement(report.totalSellerPayoutAmount);
  var totalProductCostsTd = createTdElement(report.totalProductCosts);
  var totalDeductionOrPaymentTd = createTdElement(report.totalDeductionOrPayment);
  var totalStorageCostTd = createTdElement(report.totalStorageCost);
  var totalDeliveryCostTd = createTdElement(report.totalDeliveryCost);
  var totalPaidAcceptanceTd = createTdElement(report.totalPaidAcceptance);
  var totalProfitMarginTd = createTdElement(report.totalProfitMargin, "totalProfitMargin");
  var totalSoldTd = createTdElement(report.totalSold);
  var totalReturnAmountTd = createTdElement(report.totalReturnAmount);
  var totalFinesTd = createTdElement(report.totalFines);
  var totalAdvertisingCostsTd = createTdElement(report.totalAdvertisingCosts);
  var totalTaxAmountTd = createTdElement(report.totalTaxAmount);
  var totalInsuranceFeeTd = createTdElement(report.totalInsuranceFee);
  var totalAdditionalInsuranceFeeTd = createTdElement(report.totalAdditionalInsuranceFee);
  var totalFinalProfitTd = createTdElement(report.totalFinalProfit, "totalFinalProfit");

  if (report.totalFinalProfit < 0) {
    totalFinalProfitTd.style.color = "red";
  }

  if (report.totalProfitMargin < 0) {
    totalProfitMarginTd.style.color = "red";
  }

  tr.append(
    totalRetailAmountTd,
    totalSoldTd,
    totalReturnAmountTd,
    totalSellerPayoutAmountTd,
    totalProductCostsTd,
    totalDeliveryCostTd,
    totalPaidAcceptanceTd,
    totalFinesTd,
    totalDeductionOrPaymentTd,
    totalStorageCostTd,
    totalAdvertisingCostsTd,
    totalTaxAmountTd,
    totalInsuranceFeeTd,
    totalAdditionalInsuranceFeeTd,
    totalProfitMarginTd,
    totalFinalProfitTd
  );

  tbody.append(tr);
};

export default createTotalsTable;
