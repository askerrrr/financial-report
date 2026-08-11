var filterCostsForReportSkus = async (skusFromReport, skusLastCostPrice) => {
  var filteredSkusLastCostPrice = [];

  while (skusLastCostPrice.length) {
    var skuLastCostPrice = skusLastCostPrice.shift();

    if (skuLastCostPrice.lastCostPrice) {
      if (skusFromReport.find((sku) => sku.id === skuLastCostPrice.id && sku.skuName === skuLastCostPrice.skuName)) {
        filteredSkusLastCostPrice.push(skuLastCostPrice);
      }
    }
  }

  return { skusLastCostPrice: filteredSkusLastCostPrice };
};

export default filterCostsForReportSkus;
