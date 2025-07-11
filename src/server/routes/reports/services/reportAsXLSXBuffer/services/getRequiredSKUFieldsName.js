var requiredSKUsFieldsName = [
  "skuName",
  "qty",
  "costPrice",
  "returnAmount",
  "averageRetailPrice",
  "deliveryCostPerSKU",
  "deductionOrPayment",
  "storageCostPerSKU",
  "acceptancePerSKU",
  "netProfitPerSKU",
  "netProfitMargin",
  "finalNetProfitPerSKU",
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
      netProfitPerSKU: sku.netProfitPerSKU,
      netProfitMargin: sku.netProfitMargin,
      finalNetProfitPerSKU: sku.finalNetProfitPerSKU,
    };
  });

module.exports = { getRequiredSKUFieldsName, requiredSKUsFieldsName };
