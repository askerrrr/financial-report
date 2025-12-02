var calc = {};

var sku = {};
var total = {};

sku.tax = require("./utils/tax");
sku.profit = require("./utils/profit");
sku.profitMargin = require("./utils/profitMargin");
sku.quantity = require("./utils/quantity");
sku.storageCost = require("./utils/storageCost");
sku.insuranceFee = require("./utils/insuranceFee");
sku.finalProfit = require("./utils/finalProfit");
sku.averageProfit = require("./utils/averageProfit");
sku.averageRetailPrice = require("./utils/averageRetailPrice");
sku.averageStorageCost = require("./utils/averageStorageCost");
sku.averageAdvertisingCost = require("./utils/averageAdvertisingCost");
sku.storageCostFromPaidStorageReport = require("./utils/SKUStorageCostFromPaidStorageReport");
sku.restParams = require("./utils/restSKUParams");

total.sold = require("./utils/totalSold");
total.taxAmount = require("./utils/totalTaxAmount");
total.storageCost = require("./utils/totalStorageCost");
total.profitMargin = require("./utils/totalProfitMargin");
total.restParams = require("./utils/restReportTotalParams");
total.deliveryCost = require("./utils/totalDeliveryCost");
total.sellerPayoutAmount = require('./utils/totalSellerPayoutAmount')

calc.sku = sku;
calc.total = total;
calc.sum = require("./utils/sum");

module.exports = calc;
