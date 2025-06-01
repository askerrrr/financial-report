var getItemsName = require("./getItemsName");
var calcTotalSold = require("./calcTotalSold");
var calcTotalFines = require("./calcTotalFines");
var calcTotalRevenue = require("./calcTotalRevenue");
var calcQuantityPerItem = require("./calcQuantityPerItem");
var calcNetProfitPerItem = require("./calcNetProfitPerItem");
var calcTotalStorageCost = require("./calcTotalStorageCost");
var calcTotalFinesPerItem = require("./calcTotalFinesPerItem");
var caclTotalDeliveryCost = require("./caclTotalDeliveryCost");
var calcTotalRevenuePerItem = require("./calcTotalRevenuePerItem");
var calcAverageNetProfitPerItem = require("./calcAverageNetProfitPerItem");
var calcAverageRetailPricePerItem = require("./calcAverageRetailPricePerItem");
var calcAverageStorageCostPerItem = require("./calcAverageStorageCostPerItem");

var parseReport = async (report) => {
  var itemsName = await getItemsName(report);
  var totalFines = await calcTotalFines(report);
  var totalRevenue = await calcTotalRevenue(report);
  var totalSold = await calcTotalSold(report, itemsName);
  var totalStorageCost = await calcTotalStorageCost(report);
  var totalDeliveryCost = await caclTotalDeliveryCost(report);

  var items = [];

  for (var i = 0; i < itemsName.length; i++) {
    var itemName = itemsName[i];

    var qty = await calcQuantityPerItem(report, itemName);
    var finesPerItem = await calcTotalFinesPerItem(report, itemName);
    var revenuePerItem = await calcTotalRevenuePerItem(report, itemName);

    var averageRetailPrice = await calcAverageRetailPricePerItem(
      report,
      qty,
      itemName
    );

    var averageStorageCost = await calcAverageStorageCostPerItem(
      totalStorageCost,
      totalSold,
      qty
    );

    var netProfitPerItem = await calcNetProfitPerItem(
      revenuePerItem,
      averageRetailPrice,
      averageStorageCost,
      finesPerItem
    );

    var averageNetProfitPerItem = await calcAverageNetProfitPerItem(
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
      averageNetProfitPerItem,
    });
  }

  return {
    totalRevenue,
    totalDeliveryCost,
    totalStorageCost,
    totalSold,
    items,
  };
};

module.exports = parseReport;
