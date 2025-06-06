var calc = require("./calculateData");
var { randomBytes } = require("crypto");
var getItemsName = require("./getItemsName");
var truncateItemsNums = require("./truncateItemsNums");
var getStorageCostPerItem = require("./getStorageCostPerItem");
var parsePaidStorageReport = require("./parsePaidStorageReport");

var parseReport = async (report, paidStorageReport, dateFrom, dateTo) => {
  var itemsName = await getItemsName(report);
  var totalFines = await calc.totalFines(report);
  var totalRevenue = await calc.totalRevenue(report);
  var totalSold = await calc.totalSold(report, itemsName);
  var totalStorageCost = await calc.totalStorageCost(report);
  var totalDeliveryCost = await calc.totalDeliveryCost(report);
  var totalRetailAmount = await calc.totalRetailAmount(report);
  var totalTaxAmount = await calc.totalTaxAmount(totalRetailAmount);

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(
    paidStorageReport
  );

  var items = [];

  for (var itemName of itemsName) {
    var qty = await calc.quantityPerItem(report, itemName);
    var finesPerItem = await calc.totalFinesPerItem(report, itemName);
    var revenuePerItem = await calc.totalRevenuePerItem(report, itemName);

    var averageRetailPrice = await calc.averageRetailPricePerItem(
      report,
      qty,
      itemName
    );

    var averageStorageCost = await calc.averageStorageCostPerItem(
      totalStorageCost,
      totalSold,
      qty
    );

    var deliveryCostPerItem = await calc.deliveryCostPerItem(report, itemName);

    var netProfitPerItem = await calc.netProfitPerItem(
      revenuePerItem,
      deliveryCostPerItem,
      averageStorageCost,
      finesPerItem
    );

    var storageCostPerItem = await getStorageCostPerItem(
      itemName,
      storageDataFromPaidStorageReport
    );

    var averageNetProfitPerItem = await calc.averageNetProfitPerItem(
      netProfitPerItem,
      qty
    );

    items.push({
      itemName,
      qty,
      finesPerItem,
      revenuePerItem,
      averageRetailPrice,
      averageStorageCost,
      netProfitPerItem,
      deliveryCostPerItem,
      averageNetProfitPerItem,
    });
  }

  var reportId = randomBytes(10).toString("hex");

  items = await truncateItemsNums(items);

  return {
    items,
    dateTo,
    reportId,
    totalSold,
    dateFrom,
    totalFines,
    totalRevenue,
    totalTaxAmount,
    totalStorageCost,
    totalDeliveryCost,
    totalRetailAmount,
    storageCostPerItem,
  };
};

module.exports = parseReport;
