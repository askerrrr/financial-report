import createThElement from "./createThElement.js";

var createTotalTableHead = async () => {
  var totalRetailAmountTh = await createThElement("Сумма продаж до комиссий");

  var totalRevenueTh = await createThElement("WB реализовал");

  var totalSoldTh = await createThElement("Продано шт.");

  var totalDeliveryCostTh = await createThElement("Доставка");

  var totalFinesTh = await createThElement("Штрафы");

  var deductionOrPaymentTh = await createThElement("Удержания/Выплаты");

  var totalStorageCostTh = await createThElement("Хранение");

  var totalAdCampaignCostsTh = await createThElement("Реклама");

  var totalNetProfitTh = await createThElement("К перечислению");

  var totalTaxAmount = await createThElement("Налоги");
  totalTaxAmount.title = `Вычисляется по формуле: Сумма продаж  *  6  /  100\nСистема налогообложения по умолчанию: УСН 6%`;

  var totalNetProfitMarginTh = await createThElement("Маржинальность %");
  totalNetProfitMarginTh.title = `Вычисляется по формуле: Итоговая сумма  *  100  /  Сумма продаж`;

  var totalFinalNetProfitTh = await createThElement("Итого");

  var tr = document.createElement("tr");

  tr.append(
    totalRetailAmountTh,
    totalRevenueTh,
    totalSoldTh,
    totalDeliveryCostTh,
    totalFinesTh,
    deductionOrPaymentTh,
    totalStorageCostTh,
    totalAdCampaignCostsTh,
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
