var calcNetProfitPerSKU = async (
  revenuePerSKU,
  deliveryCostPerSKU,
  averageStorageCost,
  finesPerSKU,
  averageAdvertisingCostPerSKU
) => {
  var netProfitPerSKU =
    revenuePerSKU -
    deliveryCostPerSKU -
    averageStorageCost -
    finesPerSKU -
    averageAdvertisingCostPerSKU;

  return netProfitPerSKU;
};

module.exports = calcNetProfitPerSKU;
