var getStorageCostPerItem = async (itemName, storageData) => {
  var item = storageData.find((e) => itemName === e.name);

  return item?.itemStorageCost ?? 0;
};

module.exports = getStorageCostPerItem;
