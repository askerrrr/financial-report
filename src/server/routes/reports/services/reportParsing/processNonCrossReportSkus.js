var calc = require("../calcServices");
var truncateSkuNums = require("./truncateSkuNums");
var getSkuNamesAndIds = require("./getSkuNamesAndIds");
var parsePaidStorageReport = require("./parsePaidStorageReport");
var {
  skuSchemaVersion,
} = require("../../../../database/migration/schemaVersioning/reportsCollection");

var processNonCrossReportSkus = async (reports, taxRate) => {
  var sku = {};
  var skus = [];

  var { weeklyFinancialReport, paidStorageReport, advertisingReport } = reports;

  var totalSold = await calc.total.sold(weeklyFinancialReport);
  var totalStorageCost = await calc.total.storageCost(weeklyFinancialReport);
  var totalAdvertisingCosts = await calculateTotalAdvertisingCosts(advertisingReport);

  var skuNamesAndIds = getSkuNamesAndIds(weeklyFinancialReport);

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(paidStorageReport);

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = weeklyFinancialReport.filter((sku) => sku.sa_name === name);

    sku.id = id;
    sku.skuName = name;
    sku.schemaVersion = skuSchemaVersion;
    sku.qty = await calc.quantity(skuFilteredReport);
    sku.fines = calc.sum(skuFilteredReport, "penalty");
    sku.acceptance = calc.sum(skuFilteredReport, "acceptance");
    sku.retailAmount = calc.sum(skuFilteredReport, "retail_amount");
    sku.tax = calc.taxAmount(sku.retailAmount, taxRate);
    sku.returnAmount = calc.sum(skuFilteredReport, "return_amount");
    sku.deliveryCost = calc.sum(skuFilteredReport, "delivery_rub");
    sku.deductionOrPayment = calc.sum(skuFilteredReport, "deduction");
    sku.additionalPayment = calc.sum(skuFilteredReport, "additional_payment");
    sku.sellerPayoutAmount = calc.sum(skuFilteredReport, "ppvz_for_pay");
    sku.averageRetailPrice = calc.averageRetailPrice(sku.qty, skuFilteredReport);
    sku.storageCost = calc.storageCost(name, storageDataFromPaidStorageReport);
    sku.averageStorageCost = calc.averageStorageCost(totalStorageCost, totalSold, sku.qty);
    sku.averageAdvertisingCost = calc.averageAdvertisingCost(
      skuNamesAndIds.length,
      totalAdvertisingCosts
    );

    sku.profit = calc.profit(sku);
    sku.averageProfit = calc.averageProfit(sku);

    skus.push({ ...sku });
  }

  skus = await truncateSkuNums(skus);

  return { skus, totalSold, totalStorageCost, totalAdvertisingCosts };
};

module.exports = processNonCrossReportSkus;

var calculateTotalAdvertisingCosts = async function (data) {
  return data.reduce((acc, i) => acc + i.updSum, 0);
};
