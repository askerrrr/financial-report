var parseSku = require("./parseSku");
var calc = require("../calcServices");
var splitSkuByYear = require("./splitSkuByYear");
var truncateSkuNums = require("./truncateSkuNums");
var getSkuNamesAndIds = require("./getSkuNamesAndIds");
var parsePaidStorageReport = require("./parsePaidStorageReport");
var splitPaidStorageReportByYear = require("./splitPaidStorageReportByYear");
var splitAdvertisingReportByYear = require("./splitAdvertisingReportByYear");
var splitWeeklyFinancialReportByYear = require("./splitWeeklyFinancialReportByYear");
var {
  skuSchemaVersion,
} = require("../../../../database/migration/schemaVersioning/reportsCollection");

var calculateTotalAdvertisingCosts = async (data) => data.reduce((acc, i) => acc + i.updSum, 0);

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

  var { startYearWeeklyFinancialReport, endYearWeeklyFinancialReport } =
    await splitWeeklyFinancialReportByYear(weeklyFinancialReport, startYearTaxParams.year);

  var startYearTotals = {};
  startYearTotals.totalSold = await calc.total.sold(startYearWeeklyFinancialReport);
  startYearTotals.totalStorageCost = await calc.total.storageCost(startYearWeeklyFinancialReport);
  startYearTotals.totalAdvertisingCosts = await calculateTotalAdvertisingCosts(startYearAd);

  var endYearTotals = {};
  endYearTotals.totalSold = await calc.total.sold(endYearWeeklyFinancialReport);
  endYearTotals.totalStorageCost = await calc.total.storageCost(endYearWeeklyFinancialReport);
  endYearTotals.totalAdvertisingCosts = await calculateTotalAdvertisingCosts(endYearAd);

  var skus = [];
  var skuNamesAndIds = getSkuNamesAndIds(weeklyFinancialReport);

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = weeklyFinancialReport.filter((sku) => sku.sa_name === name);
    var { startYearSku, endYearSku } = splitSkuByYear(skuFilteredReport, startYearTaxParams.year);

    var currentYearPropPostfix = "InCurrentYear";
    var nextYearPropPostfix = "InNextYear";

    var currentYearSkuData = await parseSku(
      name,
      startYearSku,
      startYearStorageData,
      startYearTaxParams.taxRate,
      startYearTotals,
      currentYearPropPostfix
    );

    var nextYearSkuData = await parseSku(
      name,
      endYearSku,
      endYearStorageData,
      endYearTaxParams.taxRate,
      endYearTotals,
      nextYearPropPostfix
    );

    var sku = Object.assign({}, currentYearSkuData, nextYearSkuData);
    sku.id = id;

    skus.push(sku);
  }
};

module.exports = processCrossReportSkus;
