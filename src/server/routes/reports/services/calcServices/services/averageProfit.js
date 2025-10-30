var calcAverageProfitPerSKU = (sku) => {
  if (sku.profit == 0 || sku.qty == 0) {
    return 0;
  }

  var averageProfitPerSKU = sku.profit / sku.qty;

  return averageProfitPerSKU;
};

module.exports = calcAverageProfitPerSKU;
