var calc = require("../calcServices");
var getSkuNamesAndIds = require("./getSkuNamesAndIds");
var truncateSKUNums = require("./truncateSKUNums");
var parsePaidStorageReport = require("./parsePaidStorageReport");
var {
  skuSchemaVersion,
} = require("../../../../database/migration/schemaVersioning/reportsCollection");

var parseReports = async (taxRate, reports) => {
  var { weeklyFinancialReport, paidStorageReport, totalAdvertisingCosts } = reports;

  var totalSold = await calc.total.sold(weeklyFinancialReport);
  var totalStorageCost = (await calc.total.storageCost(weeklyFinancialReport)).truncate();

  var skuNamesAndIds = getSkuNamesAndIds(weeklyFinancialReport);

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(paidStorageReport);

  var sku = {};
  var skus = [];

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = weeklyFinancialReport.filter((sku) => sku.sa_name === name);

    sku.id = id;
    sku.skuName = name;
    sku.schemaVersion = skuSchemaVersion;
    sku.qty = await calc.sku.quantity(skuFilteredReport);
    sku.fines = calc.sum(skuFilteredReport, "penalty");
    sku.acceptance = calc.sum(skuFilteredReport, "acceptance");
    sku.retailAmount = calc.sum(skuFilteredReport, "retail_amount");
    sku.tax = calc.sku.tax(sku.retailAmount, taxRate);
    sku.returnAmount = calc.sum(skuFilteredReport, "return_amount");
    sku.deliveryCost = calc.sum(skuFilteredReport, "delivery_rub");
    sku.deductionOrPayment = calc.sum(skuFilteredReport, "deduction");
    sku.additionalPayment = calc.sum(skuFilteredReport, "additional_payment");
    sku.sellerPayoutAmount = calc.sum(skuFilteredReport, "ppvz_for_pay");
    sku.averageRetailPrice = calc.sku.averageRetailPrice(sku.qty, skuFilteredReport);
    sku.storageCost = calc.sku.storageCost(name, storageDataFromPaidStorageReport);
    sku.averageStorageCost = calc.sku.averageStorageCost(totalStorageCost, totalSold, sku.qty);

    sku.averageAdvertisingCost = calc.sku
      .averageAdvertisingCost(skuNamesAndIds.length, totalAdvertisingCosts)
      .truncate();

    sku.profit = calc.sku.profit(sku);
    sku.averageProfit = calc.sku.averageProfit(sku);

    skus.push({ ...sku });
  }

  skus = await truncateSKUNums(skus);

  var totalFines = calc.sum(skus, "fines");
  var totalTaxAmount = calc.sum(skus, "tax").truncate();
  var totalReturnAmount = calc.sum(skus, "returnAmount");
  var totalRetailAmount = calc.sum(skus, "retailAmount");
  var totalPaidAcceptance = calc.sum(skus, "acceptance");
  var totalProfit = calc.sum(skus, "profit").truncate();
  var totalAdditionalPayment = calc.sum(skus, "additionalPayment");
  var totalDeliveryCost = calc.sum(skus, "deliveryCost").truncate();
  var totalDeductionOrPayment = calc.sum(skus, "deductionOrPayment");
  var totalSellerPayoutAmount = calc.sum(skus, "sellerPayoutAmount").truncate();

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

  return { report, skuNamesAndIds };
};

module.exports = parseReports;
