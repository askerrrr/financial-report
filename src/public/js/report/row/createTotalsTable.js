import createTdElement from "./services/createTdElement.js";

var table = document.getElementById("totals-table");

var tbody = document.createElement("tbody");

var tr = document.createElement("tr");

var createTotalsTable = async (report) => {
  var totalRetailAmountTd = await createTdElement(report.totalRetailAmount);

  var totalRevenueTd = await createTdElement(report.totalRevenue);

  var totalDeductionOrPaymentTd = await createTdElement(report.totalDeductionOrPayment);

  var totalStorageCostTd = await createTdElement(report.totalStorageCost);
  var totalDeliveryCostTd = await createTdElement(report.totalDeliveryCost);

  var totalProfitMarginTd = await createTdElement(report.totalProfitMargin, "totalProfitMargin");

  var totalSoldTd = await createTdElement(report.totalSold);

  var totalReturnAmountTd = await createTdElement(report.totalReturnAmount);

  var totalFinesTd = await createTdElement(report.totalFines);

  var totalAdCampaignCostsTd = await createTdElement(report.totalAdCampaignCosts);

  var totalProfitTd = await createTdElement(report.totalProfit);

  var totalTaxAmountTd = await createTdElement(report.totalTaxAmount);

  var totalFinalProfitTd = await createTdElement(report.totalFinalProfit, "totalFinalProfit");

  if (report.totalFinalProfit < 0) {
    totalFinalProfitTd.style.color = "red";
  }

  tr.append(
    totalRetailAmountTd,
    totalRevenueTd,
    totalSoldTd,
    totalReturnAmountTd,
    totalDeliveryCostTd,
    totalFinesTd,
    totalDeductionOrPaymentTd,
    totalStorageCostTd,
    totalAdCampaignCostsTd,
    totalProfitTd,
    totalTaxAmountTd,
    totalProfitMarginTd,
    totalFinalProfitTd
  );

  tbody.append(tr);

  table.append(tbody);

  var body = document.getElementById("report-body");
  body.append(table);

  return body;
};

export default createTotalsTable;
