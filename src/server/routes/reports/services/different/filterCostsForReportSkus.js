var filterCostsForReportSkus = async (skusFromReport, skusLastCostPrice) => {
  var filteredSkusLastCostPrice = [];

  while (skusLastCostPrice.length) {
    var skuLastCostPrice = skusLastCostPrice.shift();

    if (skusFromReport.find((sku) => sku.id === skuLastCostPrice.id && sku.isCostPriceSet)) {
      filteredSkusLastCostPrice.push(skuLastCostPrice);
    }
  }

  return { skusLastCostPrice: filteredSkusLastCostPrice };
};

module.exports = filterCostsForReportSkus;
