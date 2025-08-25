var calcTotalSold = require("./totalSold");
var calcTaxPerSKU = require("./taxPerSKU");
var calcTotalFines = require("./totalFines");
var calcTotalProfit = require("./totalProfit");
var calcFinesPerSKU = require("./finesPerSKU");
var calcProfitPerSKU = require("./profitPerSKU");
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
var calcSellerPayoutAmountPerSKU = require("./sellerPayoutAmountPerSKU");
var calcDeliveryCostPerSKU = require("./deliveryCostPerSKU");
var calcRetailAmountPerSKU = require("./retailAmountPerSKU");
var calcDeductionsOrPayments = require("./deductionsOrPayments");
var calcTotalProfitMargin = require("./totalProfitMargin");
var calcPaidAcceptancePerSKU = require("./paidAcceptancePerSKU");
var calcFinalProfitPerSKU = require("./finalProfitPerSKU");
var calcAverageProfitPerSKU = require("./averageProfitPerSKU");
var calcAdditionalPaymentPerSKU = require("./additionalPaymentPerSKU");
var calcTotalDeductionOrPayment = require("./totalDeductionOrPayment");
var calcAverageRetailPricePerSKU = require("./averageRetailPricePerSKU");
var calcAverageStorageCostPerSKU = require("./averageStorageCostPerSKU");
var calcTotalSellerPayoutAmount = require("./totalSellerPayoutAmount");
var caclAverageAdvertisingCostPerSKU = require("./averageAdvertisingCostPerSKU");
var calcTotalAdditionalPayment = require("./totalAdditionalPayment");

var calc = {
  profitMargin: (revenuePerSKU, finalProfitPerSKU) => calcProfitMargin(revenuePerSKU, finalProfitPerSKU),

  storageCostPerSKU: (skusName, storageData) => calcStorageCostPerSKU(skusName, storageData),

  acceptancePerSKU: (skusName, report) => calcPaidAcceptancePerSKU(skusName, report),

  retailAmountPerSKU: (skusName, report) => calcRetailAmountPerSKU(skusName, report),

  deductionsOrPayments: (report) => calcDeductionsOrPayments(report),

  additionalPaymentPerSKU: (sku) => calcAdditionalPaymentPerSKU(sku),

  returnAmountPerSKU: (sku) => caclReturnAmountPerSKU(sku),

  profitPerSKU: (sku) => calcProfitPerSKU(sku),

  insuranceFeePerSKU: (finalProfitPerSKU, insuranceFeePercentage) => calcInsuranceFeePerSKU(finalProfitPerSKU, insuranceFeePercentage),

  averageAdvertisingCostPerSKU: (totalSKUs, totalAdCampaignCosts) => caclAverageAdvertisingCostPerSKU(totalSKUs, totalAdCampaignCosts),

  taxPerSKU: (retailAmount, taxRate) => calcTaxPerSKU(retailAmount, taxRate),

  quantityPerSKU: (report) => calcQuantityPerSKU(report),

  finesPerSKU: (data, skusName) => calcFinesPerSKU(data, skusName),

  totalSold: (report) => calcTotalSold(report),

  totalFines: (skus) => calcTotalFines(skus),

  totalSellerPayoutAmount: (skus) => calcTotalSellerPayoutAmount(skus),

  totalReturnAmount: (skus) => calcTotalReturnAmount(skus),

  totalProfit: (skus) => calcTotalProfit(skus),

  totalDeliveryCost: (skus) => calcTotalDeliveryCost(skus),

  totalStorageCost: (report) => calcTotalStorageCost(report),

  totalRetailAmount: (skus) => calcTotalRetailAmount(skus),

  totalTaxAmount: (skus) => calcTotalTaxAmount(skus),

  totalProfitMargin: (totalSellerPayoutAmount, totalFinalProfit) => calcTotalProfitMargin(totalSellerPayoutAmount, totalFinalProfit),

  totalDeductionOrPayment: (skus) => calcTotalDeductionOrPayment(skus),

  totalAdditionalPayment: (skus) => calcTotalAdditionalPayment(skus),

  sellerPayoutAmountPerSKU: (sku) => calcSellerPayoutAmountPerSKU(sku),

  totalPaidAcceptance: (skus) => calcTotalPaidAcceptance(skus),

  deliveryCostPerSKU: (data, skusName) => calcDeliveryCostPerSKU(data, skusName),

  averageProfitPerSKU: (sku) => calcAverageProfitPerSKU(sku),

  finalProfitPerSKU: (profitPerSKU, costPrice, qty) => calcFinalProfitPerSKU(profitPerSKU, costPrice, qty),

  averageStorageCostPerSKU: (totalStorageCost, totalSold, qty) => calcAverageStorageCostPerSKU(totalStorageCost, totalSold, qty),

  averageRetailPricePerSKU: (data, quantity, skusName) => calcAverageRetailPricePerSKU(data, quantity, skusName),
};

module.exports = calc;
