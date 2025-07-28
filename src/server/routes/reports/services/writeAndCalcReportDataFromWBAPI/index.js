var calc = require("./calcServices/index");
var getSkuNames = require("./getSkuNames");
var truncateSKUNums = require("./truncateSKUNums");
var parsePaidStorageReport = require("./parsePaidStorageReport");

var parseReports = async (options, reports) => {
  var { taxRate } = options;

  var { mainReport, storageReport, totalAdCampaignCosts } = reports;

  var skuNames = await getSkuNames(mainReport);
  var totalFines = await calc.totalFines(mainReport);
  var totalRevenue = await calc.totalRevenue(mainReport);
  var totalSold = await calc.totalSold(mainReport, skuNames);
  var totalReturnAmount = await calc.totalReturnAmount(mainReport);
  var totalStorageCost = await calc.totalStorageCost(mainReport);
  var totalDeliveryCost = await calc.totalDeliveryCost(mainReport);
  var totalRetailAmount = await calc.totalRetailAmount(mainReport);
  var totalTaxAmount = await calc.totalTaxAmount(totalRetailAmount, taxRate);
  var totalPaidAcceptance = await calc.totalPaidAcceptance(mainReport);
  var totalDeductionOrPayment = await calc.totalDeductionOrPayment(mainReport);

  var totalNetProfit = await calc.totalNetProfit(
    totalRevenue,
    totalStorageCost,
    totalDeliveryCost,
    totalPaidAcceptance,
    totalAdCampaignCosts
  );

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(
    storageReport
  );

  var skus = [];

  for (var skuName of skuNames) {
    var skuFilteredReport = mainReport.filter((sku) => sku.sa_name === skuName);

    var qty = await calc.quantityPerSKU(skuFilteredReport);
    var finesPerSKU = await calc.finesPerSKU(skuFilteredReport);
    var revenuePerSKU = await calc.totalRevenuePerSKU(skuFilteredReport);

    var averageRetailPrice = await calc.averageRetailPricePerSKU(
      qty,
      skuFilteredReport
    );

    var averageStorageCost = await calc.averageStorageCostPerSKU(
      totalStorageCost,
      totalSold,
      qty
    );

    var returnAmountPerSKU = await calc.returnAmountPerSKU(skuFilteredReport);

    var deductionOrPayment = await calc.deductionsOrPayments(skuFilteredReport);

    var retailAmountPerSKU = await calc.retailAmountPerSKU(skuFilteredReport);

    var taxPerSKU = await calc.taxPerSKU(retailAmountPerSKU, taxRate);

    var deliveryCostPerSKU = await calc.deliveryCostPerSKU(skuFilteredReport);

    var acceptancePerSKU = await calc.acceptancePerSKU(skuFilteredReport);

    var averageAdvertisingCostPerSKU = await calc.averageAdvertisingCostPerSKU(
      skuNames.length,
      totalAdCampaignCosts
    );

    var netProfitPerSKU = await calc.netProfitPerSKU(
      revenuePerSKU,
      deliveryCostPerSKU,
      averageStorageCost,
      finesPerSKU,
      averageAdvertisingCostPerSKU
    );

    var storageCostPerSKU = await calc.storageCostPerSKU(
      skuName,
      storageDataFromPaidStorageReport
    );

    var averageNetProfitPerSKU = await calc.averageNetProfitPerSKU(
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
      deductionOrPayment,
      returnAmountPerSKU,
      averageNetProfitPerSKU,
      averageAdvertisingCostPerSKU,
    });
  }

  skus = await truncateSKUNums(skus);

  return {
    skus,
    totalSold,
    totalFines,
    totalRevenue,
    totalTaxAmount,
    totalNetProfit,
    totalStorageCost,
    totalDeliveryCost,
    totalReturnAmount,
    totalRetailAmount,
    totalPaidAcceptance,
    totalAdCampaignCosts,
    totalDeductionOrPayment,
  };
};

module.exports = parseReports;
