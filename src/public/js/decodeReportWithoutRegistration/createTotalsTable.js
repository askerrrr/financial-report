import createTdElement from "../report/table/services/createTdElement.js";

var table = document.getElementById("totals-table");
var tbody = document.getElementById("totals-tbody");
var tr = document.createElement("tr");

var createTotalsTable = async (report) => {
  var totalRetailAmountTd = await createTdElement(report.totalRetailAmount);
  var totalSoldTd = await createTdElement(report.totalSold);
  var totalReturnAmountTd = await createTdElement(report.totalReturnAmount);
  var totalSellerPayoutAmountTd = await createTdElement(report.totalSellerPayoutAmount);
  var totalDeductionOrPaymentTd = await createTdElement(report.totalDeductionOrPayment);
  var totalStorageCostTd = await createTdElement(report.totalStorageCost);
  var totalProductCostsTd = await createTdElement(report.totalProductCosts);
  var totalDeliveryCostTd = await createTdElement(report.totalDeliveryCost);
  var totalPaidAcceptanceTd = await createTdElement(report.totalPaidAcceptance);
  var totalProfitMarginTd = await createTdElement(report.totalProfitMargin, "totalProfitMargin");
  var totalFinesTd = await createTdElement(report.totalFines);
  var totalAdvertisingCosts = await createTdElement(report.totalAdvertisingCosts);
  var totalTaxAmountTd = await createTdElement(report.totalTaxAmount);
  var totalFinalProfitTd = await createTdElement(report.totalFinalProfit, "totalFinalProfit");

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
