var calcStorageCostPerItem = async (skuName, storageData) => {
  var sku = storageData.find((e) => skuName === e.name);

  return sku?.StorageCostPerSKU ?? 0;
};

module.exports = calcStorageCostPerItem;
