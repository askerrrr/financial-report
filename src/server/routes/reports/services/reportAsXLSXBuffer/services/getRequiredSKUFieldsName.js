var requiredSKUsFieldsName = [
  "skuName",
  "qty",
  "returnAmount",
  "costPrice",
  "averageRetailPrice",
  "deliveryCost",
  "deductionOrPayment",
  "storageCost",
  "acceptance",
  "profit",
  "profitMargin",
  "finalProfitPerSKU",
];

var getRequiredSKUFieldsName = async (skus) =>
  skus.map((sku) => {
    return {
      skuName: sku.skuName,
      qty: sku.qty,
      costPrice: sku.costPrice,
      returnAmount: sku.returnAmount,
      averageRetailPrice: sku.averageRetailPrice,
      deliveryCost: sku.deliveryCost,
      deductionOrPayment: sku.deductionOrPayment,
      storageCost: sku.storageCost,
      acceptance: sku.acceptance,
      profit: sku.profit,
      profitMargin: sku.profitMargin,
      finalProfitPerSKU: sku.finalProfitPerSKU,
    };
  });

module.exports = { getRequiredSKUFieldsName, requiredSKUsFieldsName };
