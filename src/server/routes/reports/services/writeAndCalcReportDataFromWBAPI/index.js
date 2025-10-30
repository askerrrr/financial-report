var calc = require("../calcServices");
var getSkuNamesAndIds = require("./getSkuNamesAndIds");
var truncateSKUNums = require("./truncateSKUNums");
var parsePaidStorageReport = require("./parsePaidStorageReport");
var { skuSchemaVersion } = require("../../../../database/migration/schemaVersioning/reportsCollection");

var parseReports = async (taxRate, reports) => {
  var { mainReport, paidStorageReport, totalAdvertisingCosts } = reports;

  var totalSold = await calc.total.sold(mainReport);
  var totalStorageCost = await calc.total.storageCost(mainReport);

  var skuNamesAndIds = getSkuNamesAndIds(mainReport);

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(paidStorageReport);

  var sku = {};
  var skus = [];

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = mainReport.filter((sku) => sku.sa_name === name);

    sku.id = id;
    sku.skuName = name;
    sku.schemaVersion = skuSchemaVersion;
    sku.qty = await calc.sku.quantity(skuFilteredReport);
    sku.finesPerSKU = calc.sku.fines(skuFilteredReport);
    sku.acceptancePerSKU = calc.sku.paidAcceptance(skuFilteredReport);
    sku.retailAmountPerSKU = calc.sku.retailAmount(skuFilteredReport);
    sku.taxPerSKU = calc.sku.tax(sku.retailAmountPerSKU, taxRate);
    sku.returnAmountPerSKU = calc.sku.returnAmount(skuFilteredReport);
    sku.deliveryCostPerSKU = calc.sku.deliveryCost(skuFilteredReport);
    sku.deductionOrPayment = calc.sku.deductionsOrPayments(skuFilteredReport);
    sku.additionalPaymentPerSKU = calc.sku.additionalPayment(skuFilteredReport);
    sku.sellerPayoutAmountPerSKU = calc.sku.sellerPayoutAmount(skuFilteredReport);
    sku.averageRetailPrice = calc.sku.averageRetailPrice(sku.qty, skuFilteredReport);
    sku.storageCostPerSKU = calc.sku.storageCost(name, storageDataFromPaidStorageReport);
    sku.averageStorageCost = calc.sku.averageStorageCost(totalStorageCost, totalSold, sku.qty);
    sku.averageAdvertisingCostPerSKU = calc.sku.averageAdvertisingCost(skuNamesAndIds.length, totalAdvertisingCosts);
    sku.profitPerSKU = calc.sku.profit(sku);
    sku.averageProfitPerSKU = calc.sku.averageProfit(sku);

    skus.push({ ...sku });
  }

  skus = await truncateSKUNums(skus);

  var totalFines = calc.total.fines(skus);
  var totalProfit = calc.total.profit(skus);
  var totalTaxAmount = calc.total.taxAmount(skus);
  var totalReturnAmount = calc.total.returnAmount(skus);
  var totalDeliveryCost = calc.total.deliveryCost(skus);
  var totalRetailAmount = calc.total.retailAmount(skus);
  var totalPaidAcceptance = calc.total.paidAcceptance(skus);
  var totalAdditionalPayment = calc.total.additionalPayment(skus);
  var totalDeductionOrPayment = calc.total.deductionOrPayment(skus);
  var totalSellerPayoutAmount = calc.total.sellerPayoutAmount(skus);

  var report = {
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

  return { report };
};

module.exports = parseReports;
