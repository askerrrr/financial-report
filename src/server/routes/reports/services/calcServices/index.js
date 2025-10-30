var calc = {};

var sku = {};
var total = {};

sku.tax = require("./services/taxPerSKU");
sku.fines = require("./services/finesPerSKU");
sku.profit = require("./services/profitPerSKU");
sku.profitMargin = require("./services/profitMargin");
sku.quantity = require("./services/quantityPerSKU");
sku.returnAmount = require("./services/returnAmountPerSKU");
sku.storageCost = require("./services/storageCostPerSKU");
sku.insuranceFee = require("./services/insuranceFeePerSKU");
sku.sellerPayoutAmount = require("./services/sellerPayoutAmountPerSKU");
sku.deliveryCost = require("./services/deliveryCostPerSKU");
sku.retailAmount = require("./services/retailAmountPerSKU");
sku.deductionsOrPayments = require("./services/deductionsOrPayments");
sku.paidAcceptance = require("./services/paidAcceptancePerSKU");
sku.finalProfit = require("./services/finalProfitPerSKU");
sku.averageProfit = require("./services/averageProfitPerSKU");
sku.additionalPayment = require("./services/additionalPaymentPerSKU");
sku.averageRetailPrice = require("./services/averageRetailPricePerSKU");
sku.averageStorageCost = require("./services/averageStorageCostPerSKU");
sku.averageAdvertisingCost = require("./services/averageAdvertisingCostPerSKU");
sku.storageCostFromPaidStorageReport = require("./services/SKUStorageCostFromPaidStorageReport");
sku.restParams = require("./services/restSKUParams");

total.sold = require("./services/totalSold");
total.fines = require("./services/totalFines");
total.profit = require("./services/totalProfit");
total.taxAmount = require("./services/totalTaxAmount");
total.storageCost = require("./services/totalStorageCost");
total.deliveryCost = require("./services/totalDeliveryCost");
total.retailAmount = require("./services/totalRetailAmount");
total.returnAmount = require("./services/totalReturnAmount");
total.paidAcceptance = require("./services/totalPaidAcceptance");
total.profitMargin = require("./services/totalProfitMargin");
total.deductionOrPayment = require("./services/totalDeductionOrPayment");
total.sellerPayoutAmount = require("./services/totalSellerPayoutAmount");
total.additionalPayment = require("./services/totalAdditionalPayment");
total.restParams = require("./services/restReportTotalParams");

calc.sku = sku;
calc.total = total;

module.exports = calc;
