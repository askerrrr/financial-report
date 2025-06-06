var getItemsNameFromPaidStorageReport = require("./getItemsNameFromPaidStorageReport");
var calcItemStorageCostFromPaidStorageReport = require("./calcServices/calcItemStorageCostFromPaidStorageReport");

var parsePaidStorageReport = async (report) => {
  var itemsName = await getItemsNameFromPaidStorageReport(report);

  var data = [];

  for (var name of itemsName) {
    var itemStorageCost = await calcItemStorageCostFromPaidStorageReport(
      report,
      name
    );

    data.push({ name, itemStorageCost });
  }

  return data;
};

module.exports = parsePaidStorageReport;
