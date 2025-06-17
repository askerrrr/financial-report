var calcRetailAmountPerSKU = async (skuName, report) => {
  var sku = report.filter((e) => e.sa_name === skuName);

  var retailAmountPerSKU = sku.reduce((acc, i) => acc + i.retail_amount, 0);

  return retailAmountPerSKU;
};

module.exports = calcRetailAmountPerSKU;
