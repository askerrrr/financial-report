import createTdElement from "../report/table/services/createTdElement.js";
import openCostPriceModal from "../report/table/services/modal/openCostPriceModal.js";

var skuIndex = 0;
var isGuestAccess = true;
var table = document.getElementById("skus-table");

var createSKUsTable = (report) => {
  var tbody = document.getElementById("skus-tbody");

  var { userId, reportId, skus } = report;

  for (var sku of skus) {
    var tr = document.createElement("tr");

    var skuName = createTdElement(sku.skuName);
    var qty = createTdElement(sku.qty);
    var returnAmount = createTdElement(sku.returnAmount);

    var data = {
      userId,
      reportId,
      skuIndex,
      skuId: sku.id,
      skuName: sku.skuName,
      taxRate: report.taxRate,
      costPrice: sku.costPrice,
    };

    var costPriceInputField = openCostPriceModal(data, isGuestAccess);
    var costPrice = createTdElement(costPriceInputField);
    var retailPrice = createTdElement(sku.averageRetailPrice);
    var deliveryCost = createTdElement(sku.deliveryCost);
    var fines = createTdElement(sku.fines);
    var storageCost = createTdElement(sku.storageCost);
    var acceptance = createTdElement(sku.acceptance);
    var profit = createTdElement(sku.profit);
    var averageProfit = createTdElement(sku.averageProfit);
    var profitMargin = createTdElement(sku.profitMargin, "profitMargin", skuIndex);
    var finalProfit = createTdElement(sku.finalProfit, "finalProfit", skuIndex);

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
      averageProfit,
      profitMargin,
      finalProfit,
    );

    skuIndex++;
    tbody.append(tr);
  }

  table.append(tbody);
  skuIndex = 0;
  return table;
};

export default createSKUsTable;
