import createThElement from "./createThElement.js";

var createTotalTableHead = async () => {
  var totalRevenueTh = await createThElement("WB реализовал");

  var totalSoldTh = await createThElement("Продано шт.");

  var totalDeliveryCostTh = await createThElement("Доставка");

  var totalFinesTh = await createThElement("Штрафы");

  var deductionOrPaymentTh = await createThElement("Удержания/Выплаты");

  var totalStorageCostTh = await createThElement("Хранение");

  var totalNetProfitTh = await createThElement("К перечислению");

  var totalTaxAmount = await createThElement("Налоги");

  var totalNetProfitMarginTh = await createThElement("Маржинальность %");

  var totalFinalNetProfitTh = await createThElement("Итого");

  var tr = document.createElement("tr");

  tr.append(
    totalRevenueTh,
    totalSoldTh,
    totalDeliveryCostTh,
    totalFinesTh,
    deductionOrPaymentTh,
    totalStorageCostTh,
    totalNetProfitTh,
    totalTaxAmount,
    totalNetProfitMarginTh,
    totalFinalNetProfitTh
  );

  var thead = document.createElement("thead");
  thead.append(tr);

  return thead;
};

export default createTotalTableHead;
