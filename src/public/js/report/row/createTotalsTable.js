import createTdElement from "./services/createTdElement.js";
import createTotalTableHead from "./services/createTotalTableHead.js";

var table = document.createElement("table");
table.id = "totals-table";

var tbody = document.createElement("tbody");

var tr = document.createElement("tr");

var createTotalsTable = async (report) => {
  var totalStorageCostTd = await createTdElement(report.totalStorageCost);
  var totalDeliveryCostTd = await createTdElement(report.totalDeliveryCost);

  var totalNetProfitMargin =
    report.items.reduce((acc, i) => acc + i.netProfitMargin, 0) /
    report.items.length;

  var totalNetProfitMarginTd = await createTdElement(
    totalNetProfitMargin,
    "totalNetProfitMargin"
  );

  var totalSoldTd = await createTdElement(report.totalSold);
  var totalFinesTd = await createTdElement(report.totalFines);

  var totalFinalNetProfit = report.items.reduce(
    (acc, i) => acc + i.finalNetProfitPerItem,
    0
  );

  var totalFinalNetProfitTd = await createTdElement(
    totalFinalNetProfit,
    "totalFinalNetProfit"
  );

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
