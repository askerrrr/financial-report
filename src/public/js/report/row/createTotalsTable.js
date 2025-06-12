import createTdElement from "./services/createTdElement.js";
import createTotalTableHead from "./services/createTotalTableHead.js";
import calcTotalFinalNetProfit from "./services/calcTotalFinalNetProfit.js";
import calcTotalNetProfitMargin from "./services/calcTotalNetProfitMargin.js";

var table = document.createElement("table");
table.id = "totals-table";

var tbody = document.createElement("tbody");

var tr = document.createElement("tr");

var createTotalsTable = async (report) => {
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

  var totalFinalNetProfit = await calcTotalFinalNetProfit(report.items);

  var totalFinalNetProfitTd = await createTdElement(
    totalFinalNetProfit,
    "totalFinalNetProfit"
  );

  if (+totalFinalNetProfit < 0) {
    totalFinalNetProfitTd.style.color = "red";
  }

  tr.append(
    totalSoldTd,
    totalDeliveryCostTd,
    totalFinesTd,
    totalStorageCostTd,
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
