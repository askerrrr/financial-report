var calc = require("./calculateData");
var { randomBytes } = require("crypto");
var getItemsName = require("./getItemsName");
var truncateItemsNums = require("./truncateItemsNums");

var parseReport = async (report, dateFrom, dateTo) => {
  var itemsName = await getItemsName(report);
  var totalFines = await calc.totalFines(report);
  var totalRevenue = await calc.totalRevenue(report);
  var totalSold = await calc.totalSold(report, itemsName);
  var totalStorageCost = await calc.totalStorageCost(report);
  var totalDeliveryCost = await calc.totalDeliveryCost(report);
  var totalRetailAmount = await calc.totalRetailAmount(report);
  var totalTaxAmount = await calc.totalTaxAmount(totalRetailAmount);

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
    reportId,
    dateFrom,
    dateTo,
    totalFines,
    totalRevenue,
    totalRetailAmount,
    totalTaxAmount,
    totalDeliveryCost,
    totalStorageCost,
    totalSold,
    items,
  };
};

module.exports = parseReport;
