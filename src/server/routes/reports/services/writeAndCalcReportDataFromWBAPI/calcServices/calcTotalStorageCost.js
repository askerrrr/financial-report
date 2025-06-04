var calcTotalStorageCost = async (data) => {
  var totalStorageCost = data.reduce((acc, i) => acc + i.storage_fee, 0);

  return Math.round(totalStorageCost);
};

module.exports = calcTotalStorageCost;
