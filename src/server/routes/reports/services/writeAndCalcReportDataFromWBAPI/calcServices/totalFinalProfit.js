var calcTotalFinalProfit = async (skus) =>
  skus.reduce((acc, sku) => acc + sku.finalProfitPerSKU, 0);

module.exports = calcTotalFinalProfit;
