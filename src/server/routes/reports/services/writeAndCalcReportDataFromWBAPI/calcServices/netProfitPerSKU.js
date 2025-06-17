var calcNetProfitPerSKU = async (
  totalRevenuePerSKU,
  deliveryCostPerSKU,
  averageStorageCost,
  totalFinesPerSKU
) => {
  var netProfitPerSKU =
    totalRevenuePerSKU -
    deliveryCostPerSKU -
    averageStorageCost -
    totalFinesPerSKU;

  return netProfitPerSKU;
};

module.exports = calcNetProfitPerSKU;
