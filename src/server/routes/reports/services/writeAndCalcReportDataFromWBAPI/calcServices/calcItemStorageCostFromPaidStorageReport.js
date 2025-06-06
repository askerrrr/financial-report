var calcItemStorageCostFromPaidStorageReport = async (report, itemName) => {
  var item = report.filter((e) => e.vendorCode == itemName);

  var itemStorageCost = item.reduce((acc, i) => acc + i.warehousePrice, 0);

  return itemStorageCost;
};

module.exports = calcItemStorageCostFromPaidStorageReport;
