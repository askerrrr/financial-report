var filterCostsForReportSkus = async (skusFromReport, skusLastCostPrice) => {
  var filteredSkusLastCostPrice = [];

  while (skusLastCostPrice.length) {
    var skuLastCostPrice = skusLastCostPrice.shift();

    if (skuLastCostPrice.lastCostPrice) {
      if (skusFromReport.find((sku) => sku.id === skuLastCostPrice.id)) {
        filteredSkusLastCostPrice.push(skuLastCostPrice);
      }
    }
  }

  return { skusLastCostPrice: filteredSkusLastCostPrice };
};

module.exports = filterCostsForReportSkus;
