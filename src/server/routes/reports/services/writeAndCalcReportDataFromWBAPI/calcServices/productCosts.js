var calcProductCosts = async (skus) =>
  skus.reduce((acc, sku) => acc + sku.qty * sku.costPrice, 0);

module.exports = calcProductCosts;
