var calc = require("../calcServices");
var truncateTotals = require("./truncateTotals");
var getSkuQtyByYear = require('./getSkuQtyByYear')
var truncateSkuNums = require("./truncateSkuNums");
var getSkuNamesAndIds = require("./getSkuNamesAndIds");
var parsePaidStorageReport = require("./parsePaidStorageReport");
var { skuSchemaVersion } = require("../../../../database/migration/schemaVersioning/reportsCollection");

var parseReports = async (taxRate, reports, isCrossYearReport, startYear, endYear) => {
  var sku = {};
  var skus = [];
  var report = {};

  var { weeklyFinancialReport, paidStorageReport, totalAdvertisingCosts } = reports;

  report.totalSold = await calc.total.sold(weeklyFinancialReport);
  report.totalStorageCost = await calc.total.storageCost(weeklyFinancialReport);

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

    if (!isCrossYearReport) {
      sku.tax = calc.taxAmount(sku.retailAmount, taxRate);
    }else {
      sku.qtyInCurrentYear = getSkuQtyByYear(skuFilteredReport, startYear);
      sku.qtyInNextYear = getSkuQtyByYear(skuFilteredReport, endYear);
    }


    sku.returnAmount = calc.sum(skuFilteredReport, "return_amount");
    sku.deliveryCost = calc.sum(skuFilteredReport, "delivery_rub");
    sku.deductionOrPayment = calc.sum(skuFilteredReport, "deduction");
    sku.additionalPayment = calc.sum(skuFilteredReport, "additional_payment");
    sku.sellerPayoutAmount = calc.sum(skuFilteredReport, "ppvz_for_pay");
    sku.averageRetailPrice = calc.averageRetailPrice(sku.qty, skuFilteredReport);
    sku.storageCost = calc.storageCost(name, storageDataFromPaidStorageReport);
    sku.averageStorageCost = calc.averageStorageCost(report.totalStorageCost, report.totalSold, sku.qty);
    sku.averageAdvertisingCost = calc.averageAdvertisingCost(skuNamesAndIds.length, totalAdvertisingCosts);

    sku.profit = calc.profit(sku);
    sku.averageProfit = calc.averageProfit(sku);

    skus.push({ ...sku });
  }

  skus = await truncateSkuNums(skus);

  report.totalFines = calc.sum(skus, "fines");
  report.totalProfit = calc.sum(skus, "profit");

  if (!isCrossYearReport) {
    report.totalTaxAmount = calc.sum(skus, "tax");
  }

  report.totalDeliveryCost = calc.sum(skus, "deliveryCost");
  report.totalReturnAmount = calc.sum(skus, "returnAmount");
  report.totalRetailAmount = calc.sum(skus, "retailAmount");
  report.totalPaidAcceptance = calc.sum(skus, "acceptance");
  report.totalAdditionalPayment = calc.sum(skus, "additionalPayment");
  report.totalDeductionOrPayment = calc.sum(skus, "deductionOrPayment");
  report.totalSellerPayoutAmount = calc.sum(skus, "sellerPayoutAmount");

  report = truncateTotals(report);

  report.skus = skus;

  return { report, skuNamesAndIds };
};

module.exports = parseReports;
