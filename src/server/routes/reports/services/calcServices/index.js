var calc = {};

var sku = {};
var total = {};

sku.tax = require("./services/tax");
sku.fines = require("./services/fines");
sku.profit = require("./services/profit");
sku.profitMargin = require("./services/profitMargin");
sku.quantity = require("./services/quantity");
sku.returnAmount = require("./services/returnAmount");
sku.storageCost = require("./services/storageCost");
sku.insuranceFee = require("./services/insuranceFee");
sku.sellerPayoutAmount = require("./services/sellerPayoutAmount");
sku.deliveryCost = require("./services/deliveryCost");
sku.retailAmount = require("./services/retailAmount");
sku.deductionsOrPayments = require("./services/deductionsOrPayments");
sku.paidAcceptance = require("./services/paidAcceptance");
sku.finalProfit = require("./services/finalProfit");
sku.averageProfitPerSKU = require("./services/averageProfit");
sku.additionalPayment = require("./services/additionalPayment");
sku.averageRetailPrice = require("./services/averageRetailPrice");
sku.averageStorageCost = require("./services/averageStorageCost");
sku.averageAdvertisingCost = require("./services/averageAdvertisingCost");
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
