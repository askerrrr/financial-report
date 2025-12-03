var calcAverageStorageCost = (totalStorageCost, totalSold, qty) => {
  var averageStorageCostPerSKU = (totalStorageCost / totalSold) * qty;

  return averageStorageCostPerSKU;
};

module.exports = calcAverageStorageCost;
