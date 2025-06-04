var calc = require("./calculateData");
var { randomBytes } = require("crypto");
var getItemsName = require("./getItemsName");

var parseReport = async (report, dateFrom, dateTo) => {
  var itemsName = await getItemsName(report);
  var totalFines = await calc.totalFines(report);
  var totalRevenue = await calc.totalRevenue(report);
  var totalSold = await calc.totalSold(report, itemsName);
  var totalStorageCost = await calc.totalStorageCost(report);
  var totalDeliveryCost = await calc.totalDeliveryCost(report);

  var items = [];

  for (var i = 0; i < itemsName.length; i++) {
    var itemName = itemsName[i];

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

    var netProfitPerItem = await calc.netProfitPerItem(
      revenuePerItem,
      averageRetailPrice,
      averageStorageCost,
      finesPerItem
    );

    var averageNetProfitPerItem = await calc.averageNetProfitPerItem(
      netProfitPerItem,
      qty
    );

    var deliveryCostPerItem = await calc.deliveryCostPerItem(report, itemName);

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

  return {
    reportId,
    dateFrom,
    dateTo,
    totalFines,
    totalRevenue,
    totalDeliveryCost,
    totalStorageCost,
    totalSold,
    items,
  };
};

module.exports = parseReport;
