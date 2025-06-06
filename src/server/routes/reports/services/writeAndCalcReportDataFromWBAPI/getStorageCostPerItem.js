var getStorageCostPerItem = async (itemName, storageDataFromPaidStorageReport) => {
  var item = storageDataFromPaidStorageReport.find((e) => e.name == itemName);

  return item.storageDataFromPaidStorageReport;
};

module.exports = getStorageCostPerItem;
