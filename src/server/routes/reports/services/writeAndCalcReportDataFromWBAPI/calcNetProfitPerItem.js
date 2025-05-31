var calcNetProfitPerItem = async (
  totalRevenuePerItem,
  averageRetailPrice,
  averageStorageCost,
  totalFinesPerItem
) =>
  totalRevenuePerItem -
  averageRetailPrice -
  averageStorageCost -
  totalFinesPerItem;

module.exports = calcNetProfitPerItem;
