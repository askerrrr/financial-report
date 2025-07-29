var requiredSKUsFieldsName = [
  "skuName",
  "qty",
  "returnAmount",
  "costPrice",
  "averageRetailPrice",
  "deliveryCostPerSKU",
  "deductionOrPayment",
  "storageCostPerSKU",
  "acceptancePerSKU",
  "profitPerSKU",
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
      deliveryCostPerSKU: sku.deliveryCostPerSKU,
      deductionOrPayment: sku.deductionOrPayment,
      storageCostPerSKU: sku.storageCostPerSKU,
      acceptancePerSKU: sku.acceptancePerSKU,
      profitPerSKU: sku.profitPerSKU,
      profitMargin: sku.profitMargin,
      finalProfitPerSKU: sku.finalProfitPerSKU,
    };
  });

module.exports = { getRequiredSKUFieldsName, requiredSKUsFieldsName };
