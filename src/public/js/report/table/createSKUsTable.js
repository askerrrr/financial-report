import createTdElement from "./services/createTdElement.js";
import openCostPriceModal from "./services/modal/openCostPriceModal.js";
import createSKUPhotoUploader from "./services/skuPhotoUploader/index.js";
import openOtherExpensesModal from "./services/modal/openOtherExpensesModal.js";

var skuIndex = 0;
var table = document.getElementById("skus-table");

var createSKUsTable = async (report) => {
  var tbody = document.getElementById("skus-tbody");

  var { reportId, recordTo, skus, userId } = report;

  for (var sku of skus) {
    var tr = document.createElement("tr");

    var data = {
      userId,
      reportId,
      skuIndex,
      skuId: sku.id,
      year: recordTo.year,
      skuName: sku.skuName,
      costPrice: sku.costPrice,
      otherExpenses: sku.otherExpenses,
    };

    var SKUPhotoUploader = await createSKUPhotoUploader(reportId, sku.skuName, null);
    var costPriceInputField = await openCostPriceModal(data);
    var otherExpensesInputField = await openOtherExpensesModal(data);

    var SKUPhotoUploaderTd = createTdElement(SKUPhotoUploader, "photo-cell", skuIndex, "photo-cell");
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
    var profitMargin = createTdElement(sku.profitMargin, "profitMargin", skuIndex);
    var finalProfit = createTdElement(sku.finalProfit, "finalProfit", skuIndex);

    if (sku.profitMargin < 0) {
      profitMargin.style.color = "red";
    }

    if (sku.finalProfit < 0) {
      finalProfit.style.color = "red";
    }

    tr.append(
      SKUPhotoUploaderTd,
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

    tbody.append(tr);
    skuIndex++;
  }

  table.append(tbody);

  return table;
};

export default createSKUsTable;
