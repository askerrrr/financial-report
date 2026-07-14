var calculateAvrgStorageCostForEachReportItem = (totalStorageCost, skuNamesAndIds) => {
  var rowNums = skuNamesAndIds.map((sku) => sku.rowNums.length);
  var totalReportItems = rowNums.reduce((acc, item) => acc + +item, 0);
  var avrgStorageCostForEachItem = +(totalStorageCost / totalReportItems).toFixed(2);
  return { avrgStorageCostForEachItem };
};

export default calculateAvrgStorageCostForEachReportItem;
