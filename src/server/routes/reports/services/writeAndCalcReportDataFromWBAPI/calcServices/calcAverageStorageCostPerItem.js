var calcAverageStorageCostPerItem = async (
  totalStorageCost,
  totalSold,
  qty
) => {
  var averageStorageCostPerItem = (totalStorageCost / totalSold) * qty;

  return Math.round(averageStorageCostPerItem);
};

module.exports = calcAverageStorageCostPerItem;
