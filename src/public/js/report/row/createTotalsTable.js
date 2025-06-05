import createThElement from "./services/createThElement.js";
import createTdElement from "./services/createTdElement.js";

var createTotalTableHead = async () => {
  var totalSoldTh = await createThElement("Всего продано шт.");

  var totalDeliveryCostTh = await createThElement("Доставка");

  var totalFinesTh = await createThElement("Удержания");

  var totalStorageCostTh = await createThElement("Хранение");

  var totalNetProfitMarginTh = await createThElement("Общая выручка %");

  var totalFinalNetProfitTh = await createThElement("Всего");

  var tr = document.createElement("tr");

  tr.append(
    totalSoldTh,
    totalDeliveryCostTh,
    totalFinesTh,
    totalStorageCostTh,
    totalNetProfitMarginTh,
    totalFinalNetProfitTh
  );

  var thead = document.createElement("thead");
  thead.append(tr);

  return thead;
};

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

  var totalNetProfitMarginTd = await createTdElement(totalNetProfitMargin);

  var totalSoldTd = await createTdElement(report.totalSold);
  var totalFinesTd = await createTdElement(report.totalFines);

  var totalFinalNetProfit = report.items.reduce(
    (acc, i) => acc + i.finalNetProfitPerItem,
    0
  );

  var totalFinalNetProfitTd = await createTdElement(totalFinalNetProfit);

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
