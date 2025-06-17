var calcTotalSold = require("./totalSold");
var calcTaxPerSKU = require("./taxPerSKU");
var calcTotalFines = require("./totalFines");
var calcTotalRevenue = require("./totalRevenue");
var calcTotalTaxAmount = require("./totalTaxAmount");
var calcTotalNetProfit = require("./totalNetProfit");
var calcNetProfitMargin = require("./netProfitMargin");
var calcQuantityPerSKU = require("./quantityPerSKU");
var calcTotalStorageCost = require("./totalStorageCost");
var calcNetProfitPerItem = require("./netProfitPerItem");
var calcTotalFinesPerItem = require("./totalFinesPerItem");
var calcTotalDeliveryCost = require("./totalDeliveryCost");
var calcTotalRetailAmount = require("./totalRetailAmount");
var calcStorageCostPerItem = require("./storageCostPerItem");
var calcTotalPaidAcceptance = require("./totalPaidAcceptance");
var calcTotalRevenuePerItem = require("./totalRevenuePerItem");
var calcDeliveryCostPerItem = require("./deliveryCostPerItem");
var calcRetailAmountPerItem = require("./retailAmountPerItem");
var calcTotalNetProfitMargin = require("./totalNetProfitMargin");
var calcPaidAcceptancePerItem = require("./paidAcceptancePerItem");
var calcFinalNetProfitPerItem = require("./finalNetProfitPerItem");
var calcAverageNetProfitPerItem = require("./averageNetProfitPerItem");
var calcAverageRetailPricePerItem = require("./averageRetailPricePerItem");
var calcAverageStorageCostPerItem = require("./averageStorageCostPerItem");
var calcAverageFinalNetProfitPerItem = require("./averageFinalNetProfitPerItem");

var calc = {
  totalSold: (data, itemsName) => calcTotalSold(data, itemsName),

  totalFines: (data) => calcTotalFines(data),

  netProfitMargin: (revenuePerItem, finalNetProfitPerItem) =>
    calcNetProfitMargin(revenuePerItem, finalNetProfitPerItem),

  storageCostPerItem: (itemName, storageData) =>
    calcStorageCostPerItem(itemName, storageData),

  acceptance: (itemName, report) => calcPaidAcceptancePerItem(itemName, report),

  retailAmountPerItem: (itemName, report) =>
    calcRetailAmountPerItem(itemName, report),

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

  taxPerSKU: (retailAmount) => calcTaxPerSKU(retailAmount),

  quantityPerSKU: (report) => calcQuantityPerSKU(report),

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
