var calcAverageStorageCostPerItem = async (
  totalStorageCost,
  totalSold,
  qty
) => {
  var averageStorageCostPerItem = (totalStorageCost / totalSold) * qty;

  return averageStorageCostPerItem;
};

module.exports = calcAverageStorageCostPerItem;
