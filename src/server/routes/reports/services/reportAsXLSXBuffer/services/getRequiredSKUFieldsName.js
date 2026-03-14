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
  "otherExpenses",
  "profit",
  "insuranceFee",
  "additionalInsuranceFee",
  "profitMargin",
  "finalProfit",
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
      otherExpenses: sku.otherExpenses,
      profit: sku.profit,
      insuranceFee: sku.insuranceFee,
      additionalInsuranceFee: sku.additionalInsuranceFee,
      profitMargin: sku.profitMargin,
      finalProfit: sku.finalProfit,
    };
  });

module.exports = { getRequiredSKUFieldsName, requiredSKUsFieldsName };
