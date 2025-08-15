import createTdElement from "../report/row/services/createTdElement.js";
import createInputField from "../report/row/services/createInputField.js";

var table = document.getElementById("skus-table");

var createSKUsTable = async (id, report, url) => {
  var tbody = document.getElementById("skus-tbody");

  var { reportId, skus } = report;

  for (var [skuIndex, sku] of Object.entries(skus)) {
    var tr = document.createElement("tr");

    var skuName = await createTdElement(sku.skuName);
    var qty = await createTdElement(sku.qty);
    var returnAmount = await createTdElement(sku.returnAmountPerSKU);

    var dataToChange = { id, skuIndex, reportId, fieldName: "costPrice", costPrice: sku.costPrice, url };

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
