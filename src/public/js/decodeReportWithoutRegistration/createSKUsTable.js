import createTdElement from "../report/table/services/createTdElement.js";
import createInputField from "../report/table/services/createInputField.js";

var table = document.getElementById("skus-table");

var createSKUsTable = async (id, report, url) => {
  var tbody = document.getElementById("skus-tbody");

  var { reportId, skus } = report;

  for (var [skuIndex, sku] of Object.entries(skus)) {
    var tr = document.createElement("tr");

    var skuName = createTdElement(sku.skuName);
    var qty = createTdElement(sku.qty);
    var returnAmount = createTdElement(sku.returnAmount);

    var dataToChange = { id, skuIndex, reportId, fieldName: "costPrice", costPrice: sku.costPrice, url };

    var costPriceInputField = await createInputField(dataToChange);
    var costPrice = createTdElement(costPriceInputField);
    var retailPrice = createTdElement(sku.averageRetailPrice);
    var deliveryCost = createTdElement(sku.deliveryCost);
    var fines = createTdElement(sku.fines);
    var storageCost = createTdElement(sku.storageCost);
    var acceptance = createTdElement(sku.acceptance);
    var profit = createTdElement(sku.profit);
    var averageProfitPerSKU = createTdElement(sku.averageProfitPerSKU);
    var profitMargin = createTdElement(sku.profitMargin, "profitMargin", skuIndex);
    var finalProfitPerSKU = createTdElement(sku.finalProfitPerSKU, "finalProfitPerSKU", skuIndex);

    tr.append(
      skuName,
      qty,
      returnAmount,
      costPrice,
      retailPrice,
      deliveryCost,
      fines,
      storageCost,
      acceptance,
      profit,
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
