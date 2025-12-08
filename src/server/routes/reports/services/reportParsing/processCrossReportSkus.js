var calc = require("../calcServices");
var splitSkuByYear = require("./splitSkuByYear");
var truncateSkuNums = require("./truncateSkuNums");
var getSkuNamesAndIds = require("./getSkuNamesAndIds");
var parsePaidStorageReport = require("./parsePaidStorageReport");
var splitPaidStorageReportByYear = require("./splitPaidStorageReportByYear");
var splitAdvertisingReportByYear = require("./splitAdvertisingReportByYear");
var {
  skuSchemaVersion,
} = require("../../../../database/migration/schemaVersioning/reportsCollection");

var processCrossReportSkus = async (reports, taxParams) => {
  var { startYearTaxParams, endYearTaxParams } = taxParams;
  var { weeklyFinancialReport, paidStorageReport, advertisingReport } = reports;

  var { startYearAd, endYearAd } = splitAdvertisingReportByYear(
    advertisingReport,
    startYearTaxParams.year
  );
  var { startYearStorageData, endYearStorageData } = splitPaidStorageReportByYear(
    paidStorageReport,
    startYearTaxParams.year
  );

  var skuNamesAndIds = getSkuNamesAndIds(weeklyFinancialReport);

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = weeklyFinancialReport.filter((sku) => sku.sa_name === name);
    var { startYearSku, endYearSku } = splitSkuByYear(skuFilteredReport, startYearTaxParams.year);

    var sku = {};

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

    skus.push(sku);
  }
};

module.exports = processCrossReportSkus;
