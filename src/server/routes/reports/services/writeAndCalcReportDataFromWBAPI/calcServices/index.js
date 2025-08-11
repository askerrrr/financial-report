var calcTotalSold = require("./totalSold");
var calcTaxPerSKU = require("./taxPerSKU");
var calcTotalFines = require("./totalFines");
var calcTotalProfit = require("./totalProfit");
var calcFinesPerSKU = require("./finesPerSKU");
var calcProfitPerSKU = require("./profitPerSKU");
var calcTotalRevenue = require("./totalRevenue");
var calcTotalTaxAmount = require("./totalTaxAmount");
var calcProfitMargin = require("./profitMargin");
var calcQuantityPerSKU = require("./quantityPerSKU");
var calcTotalStorageCost = require("./totalStorageCost");
var caclReturnAmountPerSKU = require("./returnAmountPerSKU");
var calcTotalDeliveryCost = require("./totalDeliveryCost");
var calcTotalRetailAmount = require("./totalRetailAmount");
var calcStorageCostPerSKU = require("./storageCostPerSKU");
var calcTotalReturnAmount = require("./totalReturnAmount");
var calcInsuranceFeePerSKU = require("./insuranceFeePerSKU");
var calcTotalPaidAcceptance = require("./totalPaidAcceptance");
var calcTotalRevenuePerSKU = require("./totalRevenuePerSKU");
var calcDeliveryCostPerSKU = require("./deliveryCostPerSKU");
var calcRetailAmountPerSKU = require("./retailAmountPerSKU");
var calcDeductionsOrPayments = require("./deductionsOrPayments");
var calcTotalProfitMargin = require("./totalProfitMargin");
var calcPaidAcceptancePerSKU = require("./paidAcceptancePerSKU");
var calcFinalProfitPerSKU = require("./finalProfitPerSKU");
var calcAverageProfitPerSKU = require("./averageProfitPerSKU");
var calcTotalDeductionOrPayment = require("./totalDeductionOrPayment");
var calcAverageRetailPricePerSKU = require("./averageRetailPricePerSKU");
var calcAverageStorageCostPerSKU = require("./averageStorageCostPerSKU");
var caclAverageAdvertisingCostPerSKU = require("./averageAdvertisingCostPerSKU");

var calc = {
  profitMargin: (revenuePerSKU, finalProfitPerSKU) => calcProfitMargin(revenuePerSKU, finalProfitPerSKU),

  storageCostPerSKU: (skusName, storageData) => calcStorageCostPerSKU(skusName, storageData),

  acceptancePerSKU: (skusName, report) => calcPaidAcceptancePerSKU(skusName, report),

  retailAmountPerSKU: (skusName, report) => calcRetailAmountPerSKU(skusName, report),

  deductionsOrPayments: (report) => calcDeductionsOrPayments(report),

  returnAmountPerSKU: (sku) => caclReturnAmountPerSKU(sku),

  profitPerSKU: (totalRevenuePerSKU, deliveryCostPerSKU, averageStorageCost, totalFinesPerSKU, averageAdvertisingCostPerSKU) =>
    calcProfitPerSKU(totalRevenuePerSKU, deliveryCostPerSKU, averageStorageCost, totalFinesPerSKU, averageAdvertisingCostPerSKU),

  insuranceFeePerSKU: (finalProfitPerSKU, insuranceFeePercentage) => calcInsuranceFeePerSKU(finalProfitPerSKU, insuranceFeePercentage),

  averageAdvertisingCostPerSKU: (totalSKUs, totalAdCampaignCosts) => caclAverageAdvertisingCostPerSKU(totalSKUs, totalAdCampaignCosts),

  taxPerSKU: (retailAmount, taxRate) => calcTaxPerSKU(retailAmount, taxRate),

  quantityPerSKU: (report) => calcQuantityPerSKU(report),

  finesPerSKU: (data, skusName) => calcFinesPerSKU(data, skusName),

  totalSold: (data, skusName) => calcTotalSold(data, skusName),

  totalFines: (data) => calcTotalFines(data),

  totalRevenue: (data) => calcTotalRevenue(data),

  totalReturnAmount: (data) => calcTotalReturnAmount(data),

  totalProfit: (totalRevenue, totalStorageCost, totalDeliveryCost, totalPaidAcceptance, totalAdCampaignCosts) =>
    calcTotalProfit(totalRevenue, totalStorageCost, totalDeliveryCost, totalPaidAcceptance, totalAdCampaignCosts),

  totalDeliveryCost: (data) => calcTotalDeliveryCost(data),

  totalStorageCost: (data) => calcTotalStorageCost(data),

  totalRetailAmount: (data) => calcTotalRetailAmount(data),

  totalTaxAmount: (totalRetailAmount, taxRate) => calcTotalTaxAmount(totalRetailAmount, taxRate),

  totalProfitMargin: (totalRevenue, totalFinalProfit) => calcTotalProfitMargin(totalRevenue, totalFinalProfit),

  totalDeductionOrPayment: (report) => calcTotalDeductionOrPayment(report),

  totalRevenuePerSKU: (data, skusName) => calcTotalRevenuePerSKU(data, skusName),

  totalPaidAcceptance: (report) => calcTotalPaidAcceptance(report),

  deliveryCostPerSKU: (data, skusName) => calcDeliveryCostPerSKU(data, skusName),

  averageProfitPerSKU: (profitPerSKU, qty) => calcAverageProfitPerSKU(profitPerSKU, qty),

  finalProfitPerSKU: (profitPerSKU, costPrice, qty) => calcFinalProfitPerSKU(profitPerSKU, costPrice, qty),

  averageStorageCostPerSKU: (totalStorageCost, totalSold, qty) => calcAverageStorageCostPerSKU(totalStorageCost, totalSold, qty),

  averageRetailPricePerSKU: (data, quantity, skusName) => calcAverageRetailPricePerSKU(data, quantity, skusName),
};

module.exports = calc;
