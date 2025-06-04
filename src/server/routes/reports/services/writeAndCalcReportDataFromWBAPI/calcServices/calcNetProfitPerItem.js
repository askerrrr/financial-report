var calcNetProfitPerItem = async (
  totalRevenuePerItem,
  averageRetailPrice,
  averageStorageCost,
  totalFinesPerItem
) => {
  var netProfitPerItem =
    totalRevenuePerItem -
    averageRetailPrice -
    averageStorageCost -
    totalFinesPerItem;

  return netProfitPerItem;
};

module.exports = calcNetProfitPerItem;
