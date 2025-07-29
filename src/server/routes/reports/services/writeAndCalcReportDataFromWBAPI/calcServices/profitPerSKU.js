var calcProfitPerSKU = async (
  revenuePerSKU,
  deliveryCostPerSKU,
  averageStorageCost,
  finesPerSKU,
  averageAdvertisingCostPerSKU
) => {
  var profitPerSKU =
    revenuePerSKU -
    deliveryCostPerSKU -
    averageStorageCost -
    finesPerSKU -
    averageAdvertisingCostPerSKU;

  return profitPerSKU;
};

module.exports = calcProfitPerSKU;
