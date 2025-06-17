var calcTotalRevenuePerSKU = async (data, skuName) => {
  var sku = data.filter((e) => e.sa_name == skuName);

  var totalRevenuePerSKU = sku.reduce((acc, i) => acc + i.ppvz_for_pay, 0);

  return totalRevenuePerSKU;
};

module.exports = calcTotalRevenuePerSKU;
