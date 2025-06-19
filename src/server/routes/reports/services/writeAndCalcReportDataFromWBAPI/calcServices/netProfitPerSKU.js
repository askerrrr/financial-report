var calcNetProfitPerSKU = async (
  totalRevenuePerSKU,
  deliveryCostPerSKU,
  averageStorageCost,
  totalFinesPerSKU,
  averageAdvertisingCostPerSKU
) => {
  var netProfitPerSKU =
    totalRevenuePerSKU -
    deliveryCostPerSKU -
    averageStorageCost -
    totalFinesPerSKU -
    averageAdvertisingCostPerSKU;

  return netProfitPerSKU;
};

module.exports = calcNetProfitPerSKU;
