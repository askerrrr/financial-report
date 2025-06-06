var calcTotalSold = require("./calcServices/calcTotalSold");
var calcTotalFines = require("./calcServices/calcTotalFines");
var calcTotalRevenue = require("./calcServices/calcTotalRevenue");
var calcTotalTaxAmount = require("./calcServices/calcTotalTaxAmount");
var calcTotalNetProfit = require("./calcServices/calcTotalNetProfit");
var calcNetProfitMargin = require("./calcServices/calcNetProfitMargin");
var calcQuantityPerItem = require("./calcServices/calcQuantityPerItem");
var calcTotalStorageCost = require("./calcServices/calcTotalStorageCost");
var calcNetProfitPerItem = require("./calcServices/calcNetProfitPerItem");
var calcTotalFinesPerItem = require("./calcServices/calcTotalFinesPerItem");
var calcTotalDeliveryCost = require("./calcServices/calcTotalDeliveryCost");
var calcTotalRetailAmount = require("./calcServices/calcTotalRetailAmount");
var calcTotalRevenuePerItem = require("./calcServices/calcTotalRevenuePerItem");
var calcDeliveryCostPerItem = require("./calcServices/calcDeliveryCostPerItem");
var calcTotalNetProfitMargin = require("./calcServices/calcTotalNetProfitMargin");
var calcFinalNetProfitPerItem = require("./calcServices/calcFinalNetProfitPerItem");
var calcAverageNetProfitPerItem = require("./calcServices/calcAverageNetProfitPerItem");
var calcAverageRetailPricePerItem = require("./calcServices/calcAverageRetailPricePerItem");
var calcAverageStorageCostPerItem = require("./calcServices/calcAverageStorageCostPerItem");
var calcAverageFinalNetProfitPerItem = require("./calcServices/calcAverageFinalNetProfitPerItem");

var calc = {
  totalSold: (data, itemsName) => calcTotalSold(data, itemsName),

  totalFines: (data) => calcTotalFines(data),

  netProfitMargin: (revenuePerItem, finalNetProfitPerItem) =>
    calcNetProfitMargin(revenuePerItem, finalNetProfitPerItem),

  netProfitPerItem: (
    totalRevenuePerItem,
    deliveryCostPerItem,
    averageStorageCost,
    totalFinesPerItem
  ) =>
    calcNetProfitPerItem(
      totalRevenuePerItem,
      deliveryCostPerItem,
      averageStorageCost,
      totalFinesPerItem
    ),

  quantityPerItem: (data, itemName) => calcQuantityPerItem(data, itemName),

  totalRevenue: (data) => calcTotalRevenue(data),

  totalNetProfit: (data) => calcTotalNetProfit(data),

  totalDeliveryCost: (data) => calcTotalDeliveryCost(data),

  totalStorageCost: (data) => calcTotalStorageCost(data),

  totalFinesPerItem: (data, itemName) => calcTotalFinesPerItem(data, itemName),

  totalRetailAmount: (data) => calcTotalRetailAmount(data),

  totalTaxAmount: (totalRetailAmount, taxRate) =>
    calcTotalTaxAmount(totalRetailAmount, taxRate),

  totalNetProfitMargin: (totalRevenue, totalNetProfit) =>
    calcTotalNetProfitMargin(totalRevenue, totalNetProfit),

  totalRevenuePerItem: (data, itemName) =>
    calcTotalRevenuePerItem(data, itemName),

  deliveryCostPerItem: (data, itemName) =>
    calcDeliveryCostPerItem(data, itemName),

  averageFinalNetProfitPerItem: (qty, finalNetProfitPerItem) =>
    calcAverageFinalNetProfitPerItem(qty, finalNetProfitPerItem),

  averageNetProfitPerItem: (netProfitPerItem, qty) =>
    calcAverageNetProfitPerItem(netProfitPerItem, qty),

  finalNetProfitPerItem: (netProfitPerItem, costPrice, qty) =>
    calcFinalNetProfitPerItem(netProfitPerItem, costPrice, qty),

  averageStorageCostPerItem: (totalStorageCost, totalSold, qty) =>
    calcAverageStorageCostPerItem(totalStorageCost, totalSold, qty),

  averageRetailPricePerItem: (data, quantity, itemName) =>
    calcAverageRetailPricePerItem(data, quantity, itemName),
};

module.exports = calc;
