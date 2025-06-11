import createTdElement from "./services/createTdElement.js";
import createInputField from "./services/createInputField.js";
import createItemPhotoUploader from "./services/createItemPhotoUploader.js";

var url = "/reports/change";

var table = document.getElementById("report");

var createReportTable = async (report) => {
  var tbody = document.createElement("tbody");

  var { reportId } = report;

  for (var [index, item] of Object.entries(report.items)) {
    var tr = document.createElement("tr");

    var itemPhotoUploader = await createItemPhotoUploader(
      reportId,
      item.itemName,
      index,
      null
    );

    var itemPhotoUploaderTd = await createTdElement(
      itemPhotoUploader,
      "photo-cell",
      index,
      "photo-cell"
    );

    var itemName = await createTdElement(item.itemName);

    var qty = await createTdElement(item.qty);

    var costPriceInputField = await createInputField(
      item.costPrice,
      index,
      "costPrice",
      url,
      reportId
    );

    var costPrice = await createTdElement(costPriceInputField);

    var retailPrice = await createTdElement(item.averageRetailPrice);

    var deliveryCost = await createTdElement(item.deliveryCostPerItem);

    var fines = await createTdElement(item.finesPerItem);

    var storageCostPerItem = await createTdElement(item.storageCostPerItem);

    var netProfitPerItem = await createTdElement(item.netProfitPerItem);

    var averageNetProfitPerItem = await createTdElement(
      item.averageNetProfitPerItem
    );

    var averageFinalNetProfitPerItem = await createTdElement(
      item.averageFinalNetProfitPerItem,
      "averageFinalNetProfitPerItem",
      index
    );

    var netProfitMargin = await createTdElement(
      item.netProfitMargin,
      "netProfitMargin",
      index
    );

    var finalNetProfitPerItem = await createTdElement(
      item.finalNetProfitPerItem,
      "finalNetProfitPerItem",
      index
    );

    tr.append(
      itemPhotoUploaderTd,
      itemName,
      qty,
      costPrice,
      retailPrice,
      deliveryCost,
      fines,
      storageCostPerItem,
      netProfitPerItem,
      averageNetProfitPerItem,
      averageFinalNetProfitPerItem,
      netProfitMargin,
      finalNetProfitPerItem
    );

    tbody.append(tr);
  }

  table.append(tbody);

  return table;
};

export default createReportTable;
