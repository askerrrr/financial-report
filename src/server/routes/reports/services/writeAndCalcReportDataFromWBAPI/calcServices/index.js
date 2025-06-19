var calcTotalSold = require("./totalSold");
var calcTaxPerSKU = require("./taxPerSKU");
var calcTotalFines = require("./totalFines");
var calcTotalRevenue = require("./totalRevenue");
var calcTotalTaxAmount = require("./totalTaxAmount");
var calcTotalNetProfit = require("./totalNetProfit");
var calcNetProfitMargin = require("./netProfitMargin");
var calcQuantityPerSKU = require("./quantityPerSKU");
var calcTotalStorageCost = require("./totalStorageCost");
var calcNetProfitPerSKU = require("./netProfitPerSKU");
var calcFinesPerSKU = require("./finesPerSKU");
var calcTotalDeliveryCost = require("./totalDeliveryCost");
var calcTotalRetailAmount = require("./totalRetailAmount");
var calcStorageCostPerSKU = require("./storageCostPerSKU");
var calcTotalPaidAcceptance = require("./totalPaidAcceptance");
var calcTotalRevenuePerSKU = require("./totalRevenuePerSKU");
var calcDeliveryCostPerSKU = require("./deliveryCostPerSKU");
var calcRetailAmountPerSKU = require("./retailAmountPerSKU");
var calcDeductionsOrPayments = require("./deductionsOrPayments");
var calcTotalNetProfitMargin = require("./totalNetProfitMargin");
var calcPaidAcceptancePerSKU = require("./paidAcceptancePerSKU");
var calcFinalNetProfitPerSKU = require("./finalNetProfitPerSKU");
var calcAverageNetProfitPerSKU = require("./averageNetProfitPerSKU");
var calcAverageRetailPricePerSKU = require("./averageRetailPricePerSKU");
var calcAverageStorageCostPerSKU = require("./averageStorageCostPerSKU");
var calcAverageFinalNetProfitPerSKU = require("./averageFinalNetProfitPerSKU");

var calc = {
  netProfitMargin: (revenuePerSKU, finalNetProfitPerSKU) =>
    calcNetProfitMargin(revenuePerSKU, finalNetProfitPerSKU),

  storageCostPerSKU: (skusName, storageData) =>
    calcStorageCostPerSKU(skusName, storageData),

  acceptancePerSKU: (skusName, report) =>
    calcPaidAcceptancePerSKU(skusName, report),

  retailAmountPerSKU: (skusName, report) =>
    calcRetailAmountPerSKU(skusName, report),

  deductionsOrPayments: (report) => calcDeductionsOrPayments(report),

  netProfitPerSKU: (
    totalRevenuePerSKU,
    deliveryCostPerSKU,
    averageStorageCost,
    totalFinesPerSKU
  ) =>
    calcNetProfitPerSKU(
      totalRevenuePerSKU,
      deliveryCostPerSKU,
      averageStorageCost,
      totalFinesPerSKU
    ),

  taxPerSKU: (retailAmount) => calcTaxPerSKU(retailAmount),

  quantityPerSKU: (report) => calcQuantityPerSKU(report),

  finesPerSKU: (data, skusName) => calcFinesPerSKU(data, skusName),

  totalSold: (data, skusName) => calcTotalSold(data, skusName),

  totalFines: (data) => calcTotalFines(data),

  totalRevenue: (data) => calcTotalRevenue(data),

  totalNetProfit: (
    totalRevenue,
    totalStorageCost,
    totalDeliveryCost,
    totalPaidAcceptance
  ) =>
    calcTotalNetProfit(
      totalRevenue,
      totalStorageCost,
      totalDeliveryCost,
      totalPaidAcceptance
    ),

  totalDeliveryCost: (data) => calcTotalDeliveryCost(data),

  totalStorageCost: (data) => calcTotalStorageCost(data),

  totalRetailAmount: (data) => calcTotalRetailAmount(data),

  totalTaxAmount: (totalRetailAmount, taxRate) =>
    calcTotalTaxAmount(totalRetailAmount, taxRate),

  totalNetProfitMargin: (totalRevenue, totalNetProfit) =>
    calcTotalNetProfitMargin(totalRevenue, totalNetProfit),

  totalRevenuePerSKU: (data, skusName) =>
    calcTotalRevenuePerSKU(data, skusName),

  totalPaidAcceptance: (report) => calcTotalPaidAcceptance(report),

  deliveryCostPerSKU: (data, skusName) =>
    calcDeliveryCostPerSKU(data, skusName),

  averageFinalNetProfitPerSKU: (qty, finalNetProfitPerSKU) =>
    calcAverageFinalNetProfitPerSKU(qty, finalNetProfitPerSKU),

  averageNetProfitPerSKU: (netProfitPerSKU, qty) =>
    calcAverageNetProfitPerSKU(netProfitPerSKU, qty),

  finalNetProfitPerSKU: (netProfitPerSKU, costPrice, qty) =>
    calcFinalNetProfitPerSKU(netProfitPerSKU, costPrice, qty),

  averageStorageCostPerSKU: (totalStorageCost, totalSold, qty) =>
    calcAverageStorageCostPerSKU(totalStorageCost, totalSold, qty),

  averageRetailPricePerSKU: (data, quantity, skusName) =>
    calcAverageRetailPricePerSKU(data, quantity, skusName),
};

module.exports = calc;
