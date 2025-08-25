import createTdElement from "./services/createTdElement.js";

var tbody = document.getElementById("totals-tbody");
var tr = document.createElement("tr");

var createTotalsTable = async (report) => {
  var totalRetailAmountTd = await createTdElement(report.totalRetailAmount);
  var totalSellerPayoutAmountTd = await createTdElement(report.totalSellerPayoutAmount);
  var totalProductCostsTd = await createTdElement(report.totalProductCosts);
  var totalDeductionOrPaymentTd = await createTdElement(report.totalDeductionOrPayment);
  var totalStorageCostTd = await createTdElement(report.totalStorageCost);
  var totalDeliveryCostTd = await createTdElement(report.totalDeliveryCost);
  var totalPaidAcceptanceTd = await createTdElement(report.totalPaidAcceptance);
  var totalProfitMarginTd = await createTdElement(report.totalProfitMargin, "totalProfitMargin");
  var totalSoldTd = await createTdElement(report.totalSold);
  var totalReturnAmountTd = await createTdElement(report.totalReturnAmount);
  var totalFinesTd = await createTdElement(report.totalFines);
  var totalAdCampaignCostsTd = await createTdElement(report.totalAdCampaignCosts);
  var totalTaxAmountTd = await createTdElement(report.totalTaxAmount);
  var totalFinalProfitTd = await createTdElement(report.totalFinalProfit, "totalFinalProfit");

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
    totalAdCampaignCostsTd,
    totalTaxAmountTd,
    totalProfitMarginTd,
    totalFinalProfitTd
  );

  tbody.append(tr);
};

export default createTotalsTable;
