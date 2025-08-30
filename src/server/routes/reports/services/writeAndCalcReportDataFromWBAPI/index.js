var calc = require("./calcServices/index");
var getSkuNames = require("./getSkuNames");
var truncateSKUNums = require("./truncateSKUNums");
var parsePaidStorageReport = require("./parsePaidStorageReport");

var parseReports = async (userId, options, reports) => {
  var { taxRate } = options;

  var { mainReport, storageReport, totalAdvertisingCosts } = reports;

  var totalSold = await calc.totalSold(mainReport);
  var totalStorageCost = await calc.totalStorageCost(mainReport);

  var skuNames = await getSkuNames(mainReport);

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(storageReport);

  var skus = [];

  for (var skuName of skuNames) {
    var skuFilteredReport = mainReport.filter((sku) => sku.sa_name === skuName);

    var sku = {};

    sku.skuName = skuName;
    sku.objectKey =  'skuname=' + skuName + ';' + 'userId=' + userId
    sku.qty = await calc.quantityPerSKU(skuFilteredReport);
    sku.finesPerSKU = await calc.finesPerSKU(skuFilteredReport);
    sku.acceptancePerSKU = await calc.acceptancePerSKU(skuFilteredReport);
    sku.retailAmountPerSKU = await calc.retailAmountPerSKU(skuFilteredReport);
    sku.taxPerSKU = await calc.taxPerSKU(sku.retailAmountPerSKU, taxRate);
    sku.returnAmountPerSKU = await calc.returnAmountPerSKU(skuFilteredReport);
    sku.deliveryCostPerSKU = await calc.deliveryCostPerSKU(skuFilteredReport);
    sku.deductionOrPayment = await calc.deductionsOrPayments(skuFilteredReport);
    sku.additionalPaymentPerSKU = await calc.additionalPaymentPerSKU(skuFilteredReport);
    sku.sellerPayoutAmountPerSKU = await calc.sellerPayoutAmountPerSKU(skuFilteredReport);
    sku.averageRetailPrice = await calc.averageRetailPricePerSKU(sku.qty, skuFilteredReport);
    sku.storageCostPerSKU = await calc.storageCostPerSKU(skuName, storageDataFromPaidStorageReport);
    sku.averageStorageCost = await calc.averageStorageCostPerSKU(totalStorageCost, totalSold, sku.qty);
    sku.averageAdvertisingCostPerSKU = await calc.averageAdvertisingCostPerSKU(skuNames.length, totalAdvertisingCosts);

    sku.profitPerSKU = await calc.profitPerSKU(sku);
    sku.averageProfitPerSKU = await calc.averageProfitPerSKU(sku);

    skus.push({ ...sku });
  }

  skus = await truncateSKUNums(skus);

  var totalFines = await calc.totalFines(skus);
  var totalProfit = await calc.totalProfit(skus);
  var totalTaxAmount = await calc.totalTaxAmount(skus);
  var totalReturnAmount = await calc.totalReturnAmount(skus);
  var totalDeliveryCost = await calc.totalDeliveryCost(skus);
  var totalRetailAmount = await calc.totalRetailAmount(skus);
  var totalPaidAcceptance = await calc.totalPaidAcceptance(skus);
  var totalAdditionalPayment = await calc.totalAdditionalPayment(skus);
  var totalDeductionOrPayment = await calc.totalDeductionOrPayment(skus);
  var totalSellerPayoutAmount = await calc.totalSellerPayoutAmount(skus);

  return {
    skus,
    totalSold,
    totalFines,
    totalSellerPayoutAmount,
    totalTaxAmount,
    totalProfit,
    totalStorageCost,
    totalDeliveryCost,
    totalReturnAmount,
    totalRetailAmount,
    totalPaidAcceptance,
    totalAdvertisingCosts,
    totalAdditionalPayment,
    totalDeductionOrPayment,
  };
};

module.exports = parseReports;
