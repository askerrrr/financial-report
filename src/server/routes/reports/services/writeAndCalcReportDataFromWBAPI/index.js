var calc = require("./calcServices/index");
var getItemsName = require("./getItemsName");
var truncateItemsNums = require("./truncateItemsNums");
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
  var totalPaidAcceptance = await calc.totalPaidAcceptance(report);

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(
    paidStorageReport
  );

  var items = [];

  for (var itemName of itemsName) {
    var skuFilteredReport = report.filter((sku) => sku.sa_name === itemName);

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

    var retailAmountPerItem = await calc.retailAmountPerItem(itemName, report);

    var taxPerSKU = await calc.taxPerSKU(retailAmountPerItem);

    var deliveryCostPerItem = await calc.deliveryCostPerItem(report, itemName);

    var acceptancePerItem = await calc.acceptance(itemName, report);

    var netProfitPerItem = await calc.netProfitPerItem(
      revenuePerItem,
      deliveryCostPerItem,
      averageStorageCost,
      finesPerItem
    );

    var storageCostPerItem = await calc.storageCostPerItem(
      itemName,
      storageDataFromPaidStorageReport
    );

    var averageNetProfitPerItem = await calc.averageNetProfitPerItem(
      netProfitPerItem,
      qty
    );

    items.push({
      qty,
      itemName,
      taxPerSKU,
      finesPerItem,
      revenuePerItem,
      netProfitPerItem,
      acceptancePerItem,
      averageRetailPrice,
      averageStorageCost,
      storageCostPerItem,
      deliveryCostPerItem,
      retailAmountPerItem,
      averageNetProfitPerItem,
    });
  }

  items = await truncateItemsNums(items);

  return {
    items,
    dateTo,
    totalSold,
    dateFrom,
    totalFines,
    totalRevenue,
    totalTaxAmount,
    totalStorageCost,
    totalDeliveryCost,
    totalRetailAmount,
    totalPaidAcceptance,
  };
};

module.exports = parseReport;
