var calcAverageStorageCostPerItem = async (totalStorageCost, totalSold, qty) =>
  (totalStorageCost / totalSold) * qty;

module.exports = calcAverageStorageCostPerItem;
