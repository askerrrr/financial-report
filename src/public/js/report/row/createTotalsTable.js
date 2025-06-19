import createTdElement from "./services/createTdElement.js";
import createTotalTableHead from "./services/createTotalTableHead.js";
import calcTotalFinalNetProfit from "./services/calcTotalFinalNetProfit.js";
import calcTotalNetProfitMargin from "./services/calcTotalNetProfitMargin.js";

var table = document.createElement("table");
table.id = "totals-table";

var tbody = document.createElement("tbody");

var tr = document.createElement("tr");

var createTotalsTable = async (report) => {
  var totalRevenueTd = await createTdElement(report.totalRevenue);

  var totalDeductionOrPaymentTd = await createTdElement(
    report.deductionOrPayment
  );

  var totalStorageCostTd = await createTdElement(report.totalStorageCost);
  var totalDeliveryCostTd = await createTdElement(report.totalDeliveryCost);

  var totalNetProfitMargin = await calcTotalNetProfitMargin(
    report.totalRetailAmount,
    report.totalFinalNetProfit
  );

  var totalNetProfitMarginTd = await createTdElement(
    totalNetProfitMargin,
    "totalNetProfitMargin"
  );

  var totalSoldTd = await createTdElement(report.totalSold);

  var totalFinesTd = await createTdElement(report.totalFines);

  var totalNetProfitTd = await createTdElement(report.totalNetProfit);

  var totalTaxAmountTd = await createTdElement(report.totalTaxAmount);

  var totalFinalNetProfit = await calcTotalFinalNetProfit(report.skus);

  var totalFinalNetProfitTd = await createTdElement(
    totalFinalNetProfit,
    "totalFinalNetProfit"
  );

  if (+totalFinalNetProfit < 0) {
    totalFinalNetProfitTd.style.color = "red";
  }

  tr.append(
    totalRevenueTd,
    totalSoldTd,
    totalDeliveryCostTd,
    totalFinesTd,
    totalDeductionOrPaymentTd,
    totalStorageCostTd,
    totalNetProfitTd,
    totalTaxAmountTd,
    totalNetProfitMarginTd,
    totalFinalNetProfitTd
  );

  tbody.append(tr);

  var thead = await createTotalTableHead();

  table.append(thead, tbody);

  var body = document.getElementById("report-body");
  body.append(table);

  return body;
};

export default createTotalsTable;
