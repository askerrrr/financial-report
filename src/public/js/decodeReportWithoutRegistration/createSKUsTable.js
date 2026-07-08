import createTdElement from "../report/table/services/createTdElement.js";
import openCostPriceModal from "../report/table/services/modal/openCostPriceModal.js";
import openOtherExpensesModal from "../report/table/services/modal/openOtherExpensesModal.js";

var isGuestAccess = true;

var createSKUsTable = (report, postfix, reportPeriodYear) => {
  var skuIndex = 0;
  var tableBody = document.createElement("tbody");

  var { userId, reportId, skus } = report;

  for (var sku of skus) {
    var tableRow = document.createElement("tr");
    var skuName = createTdElement(sku.skuName);
    var qty = createTdElement(sku.qty);
    var returnAmount = createTdElement(sku.returnAmount);

    var data = {
      userId,
      reportId,
      skuIndex,
      skuId: sku.id,
      skuName: sku.skuName,
      year: reportPeriodYear,
      taxRate: report.taxRate,
      dateFrom: report.dateFrom,
      dateTo: report.dateTo,
      ["costPrice" + postfix]: sku.costPrice,
      // ["otherExpenses" + postfix]: sku.otherExpenses,
    };

    var costPriceInputField = openCostPriceModal(data, isGuestAccess, postfix);
    // var otherExpensesInputField = openOtherExpensesModal(data, isGuestAccess, postfix);

    var costPrice = createTdElement(costPriceInputField);
    //var otherExpenses = createTdElement(otherExpensesInputField);
    var retailPrice = createTdElement(sku.averageRetailPrice);
    var deliveryCost = createTdElement(sku.deliveryCost);
    var fines = createTdElement(sku.fines);
    var storageCost = createTdElement(sku.storageCost);
    var acceptance = createTdElement(sku.acceptance);
    var profit = createTdElement(sku.profit);
    var averageProfit = createTdElement(sku.averageProfit);

    var profitMarginTdId = "profitMargin" + postfix + "-" + skuIndex + "-" + reportPeriodYear;
    var profitMargin = createTdElement(sku.profitMargin, profitMarginTdId);

    var finalProfitTdId = "finalProfit" + postfix + "-" + skuIndex + "-" + reportPeriodYear;
    var finalProfit = createTdElement(sku.finalProfit, finalProfitTdId);

    tableRow.append(
      skuName,
      qty,
      returnAmount,
      retailPrice,
      deliveryCost,
      fines,
      storageCost,
      acceptance,
      profit,
      averageProfit,
      costPrice,
      //otherExpenses,
      profitMargin,
      finalProfit,
    );

    tableBody.append(tableRow);
    skuIndex++;
  }

  var table = document.createElement("table");
  table.id = "skus-table-" + reportPeriodYear;

  var { tableHead } = createSkusTableHead();

  table.append(tableHead, tableBody);

  var tablesContainer = document.getElementById("tables-container");
  tablesContainer.append(table);
};

export default createSKUsTable;

var tableHeadContent = `
   <tr>
          <th>Артикул</th>
          <th>Кол-во</th>
          <th>Возвраты</th>
          <th>Себестоимость в р.</th>
          <th>Средняя розничная цена</th>
          <th>Доставка</th>
          <th>Удержания/Выплаты</th>
          <th>Хранение</th>
          <th>Приемка</th>
          <th>Выплата с вычетом всех услуг WB</th>
          <th>Средняя прибыль с вычетом всех услуг WB на 1 ед.</th>
          <th>Чистая прибыль в %</th>
          <th>Итого в р.</th>
  </tr>`;

function createSkusTableHead() {
  var tableHead = document.createElement("thead");
  tableHead.innerHTML = tableHeadContent;
  return { tableHead };
}
