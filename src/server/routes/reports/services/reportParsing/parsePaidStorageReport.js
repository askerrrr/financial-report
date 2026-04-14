import calc from "../calcServices/index.js";

import getSkuNamesFromPaidStorageReport from "./getSkuNamesFromPaidStorageReport.js";

var parsePaidStorageReport = async (report) => {
  var skuNames = await getSkuNamesFromPaidStorageReport(report);

  var data = [];

  for (var name of skuNames) {
    var skuStorageCost = await calc.sku.storageCostFromPaidStorageReport(report, name);

    data.push({ name, skuStorageCost });
  }
  ("");
  return data;
};

export default parsePaidStorageReport;
