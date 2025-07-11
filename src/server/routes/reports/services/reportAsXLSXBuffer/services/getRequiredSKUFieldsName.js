var requiredSKUsFieldsName = [
  "skuName",
  "qty",
  "costPrice",
  "returnAmount",
  "averageRetailPrice",
  "deliveryCost",
  "deductionOrPayment",
  "storageCost",
  "acceptance",
  "netProfit",
  "netProfitMargin",
  "finalNetProfit",
];

var getRequiredSKUFieldsName = async (skus) =>
  skus.map((sku) => {
    return {
      skuName: sku.skuName,
      qty: sku.qty,
      costPrice: sku.costPrice,
      returnAmount: sku.returnAmount,
      averageRetailPrice: sku.averageRetailPrice,
      deliveryCost: sku.deliveryCostPerSKU,
      deductionOrPayment: sku.deductionOrPayment,
      storageCost: sku.storageCostPerSKU,
      acceptance: sku.acceptancePerSKU,
      netProfit: sku.netProfitPerSKU,
      netProfitMargin: sku.netProfitMargin,
      finalNetProfit: sku.finalNetProfitPerSKU,
    };
  });

module.exports = { getRequiredSKUFieldsName, requiredSKUsFieldsName };
