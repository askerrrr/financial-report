import createTdElement from "./services/createTdElement.js";
import createInputField from "./services/createInputField.js";

var url = "/reports/change";

var table = document.getElementById("report");

var createReportTable = async (report) => {
  var tbody = document.createElement("tbody");

  var { reportId } = report;

  for (var [index, item] of Object.entries(report.items)) {
    var tr = document.createElement("tr");

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

    var averageStorageCost = await createTdElement(item.averageStorageCost);

    var netProfitPerItem = await createTdElement(item.netProfitPerItem);

    var averageNetProfitPerItem = await createTdElement(
      item.averageNetProfitPerItem
    );

    var averageFinalNetProfitPerItem = await createTdElement(
      item.averageFinalNetProfitPerItem,
      index,
      "averageFinalNetProfitPerItem"
    );

    var netProfitMargin = await createTdElement(
      item.netProfitMargin,
      index,
      "netProfitMargin"
    );

    var finalNetProfitPerItem = await createTdElement(
      item.finalNetProfitPerItem,
      index,
      "finalNetProfitPerItem"
    );

    tr.append(
      itemName,
      qty,
      costPrice,
      retailPrice,
      deliveryCost,
      fines,
      averageStorageCost,
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
