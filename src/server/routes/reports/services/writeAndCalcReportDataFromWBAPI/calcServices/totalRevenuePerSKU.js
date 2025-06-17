var calcTotalRevenuePerSKU = async (sku) => {
  var totalRevenuePerSKU = sku.reduce((acc, i) => acc + i.ppvz_for_pay, 0);

  return totalRevenuePerSKU;
};

module.exports = calcTotalRevenuePerSKU;
