var getItemsNameFromPaidStorageReport = require("./getItemsNameFromPaidStorageReport");
var calcItemStorageCostFromPaidStorageReport = require("./calcServices/itemStorageCostFromPaidStorageReport");

var parsePaidStorageReport = async (report) => {
  var skuNames = await getItemsNameFromPaidStorageReport(report);

  var data = [];

  for (var name of skuNames) {
    var skuStorageCost = await calcItemStorageCostFromPaidStorageReport(
      report,
      name
    );

    data.push({ name, skuStorageCost });
  }

  return data;
};

module.exports = parsePaidStorageReport;
