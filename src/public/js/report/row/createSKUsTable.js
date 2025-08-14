import createTdElement from "./services/createTdElement.js";
import createInputField from "./services/createInputField.js";
import createSKUPhotoUploader from "./services/skuPhotoUploader/index.js";

var table = document.getElementById("skus-table");

var createSKUsTable = async (report) => {
  var tbody = document.getElementById("skus-tbody");

  var { reportId, recordTo, skus, userId } = report;

  for (var [skuIndex, sku] of Object.entries(skus)) {
    var tr = document.createElement("tr");

    var SKUPhotoUploader = await createSKUPhotoUploader(reportId, sku.skuName, skuIndex, null);
    var SKUPhotoUploaderTd = await createTdElement(SKUPhotoUploader, "photo-cell", skuIndex, "photo-cell");
    var skuName = await createTdElement(sku.skuName);
    var qty = await createTdElement(sku.qty);
    var returnAmount = await createTdElement(sku.returnAmountPerSKU);

    var dataToChange = { userId, skuIndex, reportId, year: +recordTo.year, fieldName: "costPrice", costPrice: sku.costPrice, url: "/reports/change" };

    var costPriceInputField = await createInputField(dataToChange);
    var costPrice = await createTdElement(costPriceInputField);
    var retailPrice = await createTdElement(sku.averageRetailPrice);
    var deliveryCost = await createTdElement(sku.deliveryCostPerSKU);
    var fines = await createTdElement(sku.finesPerSKU);
    var storageCostPerSKU = await createTdElement(sku.storageCostPerSKU);
    var acceptancePerSKU = await createTdElement(sku.acceptancePerSKU);
    var profitPerSKU = await createTdElement(sku.profitPerSKU);
    var averageProfitPerSKU = await createTdElement(sku.averageProfitPerSKU);
    var profitMargin = await createTdElement(sku.profitMargin, "profitMargin", skuIndex);
    var finalProfitPerSKU = await createTdElement(sku.finalProfitPerSKU, "finalProfitPerSKU", skuIndex);

    tr.append(
      SKUPhotoUploaderTd,
      skuName,
      qty,
      returnAmount,
      costPrice,
      retailPrice,
      deliveryCost,
      fines,
      storageCostPerSKU,
      acceptancePerSKU,
      profitPerSKU,
      averageProfitPerSKU,
      profitMargin,
      finalProfitPerSKU
    );

    tbody.append(tr);
  }

  table.append(tbody);

  return table;
};

export default createSKUsTable;
