import createThElement from "./createThElement.js";

var createTotalTableHead = async () => {
  var totalSoldTh = await createThElement("Всего продано шт.");

  var totalDeliveryCostTh = await createThElement("Доставка");

  var totalFinesTh = await createThElement("Удержания");

  var totalStorageCostTh = await createThElement("Хранение");

  var totalTaxAmount = await createThElement("Налоги");

  var totalNetProfitMarginTh = await createThElement("Маржинальность %");

  var totalFinalNetProfitTh = await createThElement("Всего");

  var tr = document.createElement("tr");

  tr.append(
    totalSoldTh,
    totalDeliveryCostTh,
    totalFinesTh,
    totalStorageCostTh,
    totalTaxAmount,
    totalNetProfitMarginTh,
    totalFinalNetProfitTh
  );

  var thead = document.createElement("thead");
  thead.append(tr);

  return thead;
};

export default createTotalTableHead;
