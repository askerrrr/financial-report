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

    var netProfitPerSKU = await createTdElement(sku.netProfitPerSKU);

    var averageNetProfitPerSKU = await createTdElement(
      sku.averageNetProfitPerSKU
    );

    var averageFinalNetProfitPerSKU = await createTdElement(
      sku.averageFinalNetProfitPerSKU,
      "averageFinalNetProfitPerSKU",
      index
    );

    var netProfitMargin = await createTdElement(
      sku.netProfitMargin,
      "netProfitMargin",
      index
    );

    var finalNetProfitPerSKU = await createTdElement(
      sku.finalNetProfitPerSKU,
      "finalNetProfitPerSKU",
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
      netProfitPerSKU,
      averageNetProfitPerSKU,
      averageFinalNetProfitPerSKU,
      netProfitMargin,
      finalNetProfitPerSKU
    );

    tbody.append(tr);
  }

  table.append(tbody);

  return table;
};

export default createReportTable;
