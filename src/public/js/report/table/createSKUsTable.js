import createTdElement from "./services/createTdElement.js";
import openCostPriceModal from "./services/modal/openCostPriceModal.js";
import createSKUPhotoUploader from "./services/skuPhotoUploader/index.js";
import openOtherExpensesModal from "./services/modal/openOtherExpensesModal.js";

var createSKUsTable = (report, reportPeriodYear) => {
  var skuIndex = 0;
  var tableBody = document.createElement("tbody");

  var { reportId, recordedTo, skus, userId } = report;

  for (var sku of skus) {
    var tr = document.createElement("tr");

    var data = {
      userId,
      reportId,
      skuIndex,
      skuId: sku.id,
      year: +reportPeriodYear,
      skuName: sku.skuName,
      costPrice: sku.costPrice,
      otherExpenses: sku.otherExpenses,
    };

    var costPriceInputField = openCostPriceModal(data);
    var otherExpensesInputField = openOtherExpensesModal(data);
    var skuPhotoUploader = createSKUPhotoUploader(reportId, sku.skuName);

    var photoElemId = "photo-cell-" + skuIndex;
    var skuPhotoUploaderTd = createTdElement(skuPhotoUploader, photoElemId, "photo-cell");

    var skuName = createTdElement(sku.skuName);
    var qty = createTdElement(sku.qty);
    var returnAmount = createTdElement(sku.returnAmount);
    var costPrice = createTdElement(costPriceInputField);
    var otherExpenses = createTdElement(otherExpensesInputField);
    var deliveryCost = createTdElement(sku.deliveryCost);
    var deductionOrPayment = createTdElement(sku.deductionOrPayment);
    var fines = createTdElement(sku.fines);
    var storageCost = createTdElement(sku.storageCost);
    var acceptance = createTdElement(sku.acceptance);
    var profit = createTdElement(sku.profit);

    var profitMarginTdId = "profitMargin-" + skuIndex + "-" + reportPeriodYear;
    var profitMargin = createTdElement(sku.profitMargin, profitMarginTdId);

    var finalProfitTdId = "finalProfit-" + skuIndex + "-" + reportPeriodYear;
    var finalProfit = createTdElement(sku.finalProfit, finalProfitTdId);

    if (sku.profitMargin < 0) {
      profitMargin.style.color = "red";
    }

    if (sku.finalProfit < 0) {
      finalProfit.style.color = "red";
    }

    tr.append(
      skuPhotoUploaderTd,
      skuName,
      qty,
      returnAmount,
      deliveryCost,
      deductionOrPayment,
      fines,
      storageCost,
      acceptance,
      profit,
      costPrice,
      otherExpenses,
      profitMargin,
      finalProfit,
    );

    tableBody.append(tr);
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
          <th>Фото</th>
          <th>Артикул</th>
          <th>Количество</th>
          <th>Возвраты</th>
          <th>Доставка</th>
          <th>Удержания/Выплаты</th>
          <th>Штрафы</th>
          <th>Хранение</th>
          <th>Приёмка</th>
          <th>Выплата с вычетом всех услуг WB</th>
          <th>Себестоимость</th>
          <th>Прочие расходы</th>
          <th>Маржинальность %</th>
          <th>Итого</th>
        </tr>`;

function createSkusTableHead() {
  var tableHead = document.createElement("thead");
  tableHead.innerHTML = tableHeadContent;
  return { tableHead };
}
