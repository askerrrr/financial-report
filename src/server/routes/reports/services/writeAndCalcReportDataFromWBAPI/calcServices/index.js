var calcTotalSold = require("./calcTotalSold");
var calcTotalFines = require("./calcTotalFines");
var calcTotalRevenue = require("./calcTotalRevenue");
var calcTotalTaxAmount = require("./calcTotalTaxAmount");
var calcTotalNetProfit = require("./calcTotalNetProfit");
var calcNetProfitMargin = require("./calcNetProfitMargin");
var calcQuantityPerItem = require("./calcQuantityPerItem");
var calcTotalStorageCost = require("./calcTotalStorageCost");
var calcNetProfitPerItem = require("./calcNetProfitPerItem");
var calcTotalFinesPerItem = require("./calcTotalFinesPerItem");
var calcTotalDeliveryCost = require("./calcTotalDeliveryCost");
var calcTotalRetailAmount = require("./calcTotalRetailAmount");
var calcTotalPaidAcceptance = require("./calcTotalPaidAcceptance");
var calcTotalRevenuePerItem = require("./calcTotalRevenuePerItem");
var calcDeliveryCostPerItem = require("./calcDeliveryCostPerItem");
var calcTotalNetProfitMargin = require("./calcTotalNetProfitMargin");
var calcFinalNetProfitPerItem = require("./calcFinalNetProfitPerItem");
var calcAverageNetProfitPerItem = require("./calcAverageNetProfitPerItem");
var calcAverageRetailPricePerItem = require("./calcAverageRetailPricePerItem");
var calcAverageStorageCostPerItem = require("./calcAverageStorageCostPerItem");
var calcAverageFinalNetProfitPerItem = require("./calcAverageFinalNetProfitPerItem");

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

  totalPaidAcceptance: (report) => calcTotalPaidAcceptance(report),

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
