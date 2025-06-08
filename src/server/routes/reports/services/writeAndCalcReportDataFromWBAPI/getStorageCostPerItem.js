var getStorageCostPerItem = async (itemName, storageData) => {
  var item = storageData.find((e) => e.name == itemName);

  return item.itemStorageCost;
};

module.exports = getStorageCostPerItem;
