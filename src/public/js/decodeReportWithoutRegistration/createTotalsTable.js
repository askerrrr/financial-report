import createTdElement from "../report/table/services/createTdElement.js";

var table = document.getElementById("totals-table");
var tbody = document.getElementById("totals-tbody");
var tr = document.createElement("tr");

var createTotalsTable = async (report) => {
  var totalRetailAmountTd = createTdElement(report.totalRetailAmount);
  var totalSoldTd = createTdElement(report.totalSold);
  var totalReturnAmountTd = createTdElement(report.totalReturnAmount);
  var totalSellerPayoutAmountTd = createTdElement(report.totalSellerPayoutAmount);
  var totalDeductionOrPaymentTd = createTdElement(report.totalDeductionOrPayment);
  var totalStorageCostTd = createTdElement(report.totalStorageCost);
  var totalProductCostsTd = createTdElement(report.totalProductCosts);
  var totalDeliveryCostTd = createTdElement(report.totalDeliveryCost);
  var totalPaidAcceptanceTd = createTdElement(report.totalPaidAcceptance);
  var totalProfitMarginTd = createTdElement(report.totalProfitMargin, "totalProfitMargin");
  var totalFinesTd = createTdElement(report.totalFines);
  var totalAdvertisingCosts = createTdElement(report.totalAdvertisingCosts);
  var totalTaxAmountTd = createTdElement(report.totalTaxAmount);
  var totalFinalProfitTd = createTdElement(report.totalFinalProfit, "totalFinalProfit");

  if (+report.totalFinalProfit < 0) {
    totalFinalProfitTd.style.color = "red";
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
    totalAdvertisingCosts,
    totalTaxAmountTd,
    totalProfitMarginTd,
    totalFinalProfitTd
  );

  tbody.append(tr);

  table.append(tbody);
};

export default createTotalsTable;
