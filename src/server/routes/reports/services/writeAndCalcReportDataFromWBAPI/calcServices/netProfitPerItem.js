var calcNetProfitPerItem = async (
  totalRevenuePerItem,
  deliveryCostPerItem,
  averageStorageCost,
  totalFinesPerItem
) => {
  var netProfitPerItem =
    totalRevenuePerItem -
    deliveryCostPerItem -
    averageStorageCost -
    totalFinesPerItem;

  return netProfitPerItem;
};

module.exports = calcNetProfitPerItem;
