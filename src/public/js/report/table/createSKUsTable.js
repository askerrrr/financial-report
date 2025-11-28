import createTdElement from "./services/createTdElement.js";
import openCostPriceModal from "./services/modal/openCostPriceModal.js";
import createSKUPhotoUploader from "./services/skuPhotoUploader/index.js";

var table = document.getElementById("skus-table");

var createSKUsTable = async (report) => {
  var tbody = document.getElementById("skus-tbody");

  var { reportId, recordTo, skus, userId } = report;

  for (var [skuIndex, sku] of Object.entries(skus)) {
    var tr = document.createElement("tr");

    var dataToChange = {
      userId,
      skuIndex,
      skuName: sku.skuName,
      reportId,
      skuId: sku.id,
      year: +recordTo.year,
      costPrice: sku.costPrice,
      url: "/reports/set-cost-price-to-sku",
    };

    var SKUPhotoUploader = await createSKUPhotoUploader(reportId, sku.skuName, null);
    var costPriceInputField = await openCostPriceModal(dataToChange);

    var SKUPhotoUploaderTd = createTdElement(SKUPhotoUploader, "photo-cell", skuIndex, "photo-cell");
    var skuName = createTdElement(sku.skuName);
    var qty = createTdElement(sku.qty);
    var returnAmount = createTdElement(sku.returnAmount);
    var costPrice = createTdElement(costPriceInputField);
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
      profitMargin,
      finalProfit
    );

    tbody.append(tr);
  }

  table.append(tbody);

  return table;
};

export default createSKUsTable;
