import createTdElement from "./services/createTdElement.js";
import createInputField from "./services/createInputField.js";
import createSKUPhotoUploader from "./services/skuPhotoUploader/index.js";

var table = document.getElementById("skus-table");

var createSKUsTable = async (report) => {
  var tbody = document.getElementById("skus-tbody");

  var { reportId, recordTo, skus, userId } = report;

  for (var [skuIndex, sku] of Object.entries(skus)) {
    var tr = document.createElement("tr");

    var dataToChange = { userId, skuIndex, reportId, year: +recordTo.year, fieldName: "costPrice", costPrice: sku.costPrice, url: "/reports/change" };

    var SKUPhotoUploader = await createSKUPhotoUploader(reportId, sku.skuName, null);
    var costPriceInputField = await createInputField(dataToChange);

    var SKUPhotoUploaderTd = createTdElement(SKUPhotoUploader, "photo-cell", skuIndex, "photo-cell");
    var skuName = createTdElement(sku.skuName);
    var qty = createTdElement(sku.qty);
    var returnAmount = createTdElement(sku.returnAmountPerSKU);
    var costPrice = createTdElement(costPriceInputField);
    var deliveryCost = createTdElement(sku.deliveryCostPerSKU);
    var deductionOrPayment = createTdElement(sku.deductionOrPayment);
    var fines = createTdElement(sku.finesPerSKU);
    var storageCostPerSKU = createTdElement(sku.storageCostPerSKU);
    var acceptancePerSKU = createTdElement(sku.acceptancePerSKU);
    var profitPerSKU = createTdElement(sku.profitPerSKU);
    var profitMargin = createTdElement(sku.profitMargin, "profitMargin", skuIndex);
    var finalProfitPerSKU = createTdElement(sku.finalProfitPerSKU, "finalProfitPerSKU", skuIndex);

    if (sku.profitMargin < 0) {
      profitMargin.style.color = "red";
    }

    if (sku.finalProfitPerSKU < 0) {
      finalProfitPerSKU.style.color = "red";
    }

    tr.append(
      SKUPhotoUploaderTd,
      skuName,
      qty,
      returnAmount,
      deliveryCost,
      deductionOrPayment,
      fines,
      storageCostPerSKU,
      acceptancePerSKU,
      profitPerSKU,
      costPrice,
      profitMargin,
      finalProfitPerSKU
    );

    tbody.append(tr);
  }

  table.append(tbody);

  return table;
};

export default createSKUsTable;
