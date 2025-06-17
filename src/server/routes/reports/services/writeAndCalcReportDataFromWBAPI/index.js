var calc = require("./calcServices/index");
var getSkuNames = require("./getSkuNames");
var truncateItemsNums = require("./truncateItemsNums");
var parsePaidStorageReport = require("./parsePaidStorageReport");

var parseReport = async (report, paidStorageReport, dateFrom, dateTo) => {
  var skuNames = await getSkuNames(report);
  var totalFines = await calc.totalFines(report);
  var totalRevenue = await calc.totalRevenue(report);
  var totalSold = await calc.totalSold(report, skuNames);
  var totalStorageCost = await calc.totalStorageCost(report);
  var totalDeliveryCost = await calc.totalDeliveryCost(report);
  var totalRetailAmount = await calc.totalRetailAmount(report);
  var totalTaxAmount = await calc.totalTaxAmount(totalRetailAmount);
  var totalPaidAcceptance = await calc.totalPaidAcceptance(report);

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(
    paidStorageReport
  );

  var skus = [];

  for (var skuName of skuNames) {
    var skuFilteredReport = report.filter((sku) => sku.sa_name === skuName);

    var qty = await calc.quantityPerSKU(skuFilteredReport);
    var finesPerSKU = await calc.totalFinesPerItem(report, skuName);
    var revenuePerSKU = await calc.totalRevenuePerItem(report, skuName);

    var averageRetailPrice = await calc.averageRetailPricePerItem(
      report,
      qty,
      skuName
    );

    var averageStorageCost = await calc.averageStorageCostPerItem(
      totalStorageCost,
      totalSold,
      qty
    );

    var retailAmountPerSKU = await calc.retailAmountPerItem(skuName, report);

    var taxPerSKU = await calc.taxPerSKU(retailAmountPerSKU);

    var deliveryCostPerSKU = await calc.deliveryCostPerItem(report, skuName);

    var acceptancePerSKU = await calc.acceptance(skuName, report);

    var netProfitPerSKU = await calc.netProfitPerItem(
      revenuePerSKU,
      deliveryCostPerSKU,
      averageStorageCost,
      finesPerSKU
    );

    var storageCostPerSKU = await calc.storageCostPerItem(
      skuName,
      storageDataFromPaidStorageReport
    );

    var averageNetProfitPerSKU = await calc.averageNetProfitPerItem(
      netProfitPerSKU,
      qty
    );

    skus.push({
      qty,
      skuName,
      taxPerSKU,
      finesPerSKU,
      revenuePerSKU,
      netProfitPerSKU,
      acceptancePerSKU,
      averageRetailPrice,
      averageStorageCost,
      storageCostPerSKU,
      deliveryCostPerSKU,
      retailAmountPerSKU,
      averageNetProfitPerSKU,
    });
  }

  skus = await truncateItemsNums(skus);

  return {
    skus,
    dateTo,
    totalSold,
    dateFrom,
    totalFines,
    totalRevenue,
    totalTaxAmount,
    totalStorageCost,
    totalDeliveryCost,
    totalRetailAmount,
    totalPaidAcceptance,
  };
};

module.exports = parseReport;
