import createTdElement from "./services/createTdElement.js";
import createInputField from "./services/createInputField.js";
import createItemPhotoUploader from "./services/skuPhotoUploader/index.js";

var url = "/reports/change";

var table = document.getElementById("report");

var createReportTable = async (report) => {
  var tbody = document.createElement("tbody");

  var { reportId, skus } = report;

  for (var [index, sku] of Object.entries(skus)) {
    var tr = document.createElement("tr");

    var SKUPhotoUploader = await createItemPhotoUploader(
      reportId,
      sku.skuName,
      index,
      null
    );

    var SKUPhotoUploaderTd = await createTdElement(
      SKUPhotoUploader,
      "photo-cell",
      index,
      "photo-cell"
    );

    var skuName = await createTdElement(sku.skuName);

    var qty = await createTdElement(sku.qty);

    var returnAmount = await createTdElement(sku.returnAmountPerSKU);

    var costPriceInputField = await createInputField(
      sku.costPrice,
      index,
      "costPrice",
      url,
      reportId
    );

    var costPrice = await createTdElement(costPriceInputField);

    var retailPrice = await createTdElement(sku.averageRetailPrice);

    var deliveryCost = await createTdElement(sku.deliveryCostPerSKU);

    var fines = await createTdElement(sku.finesPerSKU);

    var storageCostPerSKU = await createTdElement(sku.storageCostPerSKU);

    var acceptancePerSKU = await createTdElement(sku.acceptancePerSKU);

    var profitPerSKU = await createTdElement(sku.profitPerSKU);

    var averageProfitPerSKU = await createTdElement(sku.averageProfitPerSKU);

    var averageFinalProfitPerSKU = await createTdElement(
      sku.averageFinalProfitPerSKU,
      "averageFinalProfitPerSKU",
      index
    );

    var profitMargin = await createTdElement(
      sku.profitMargin,
      "profitMargin",
      index
    );

    var finalProfitPerSKU = await createTdElement(
      sku.finalProfitPerSKU,
      "finalProfitPerSKU",
      index
    );

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
      averageFinalProfitPerSKU,
      profitMargin,
      finalProfitPerSKU
    );

    tbody.append(tr);
  }

  table.append(tbody);

  return table;
};

export default createReportTable;
