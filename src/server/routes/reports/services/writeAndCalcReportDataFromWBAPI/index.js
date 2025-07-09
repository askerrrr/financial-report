var calc = require("./calcServices/index");
var getSkuNames = require("./getSkuNames");
var truncateSKUNums = require("./truncateSKUNums");
var parsePaidStorageReport = require("./parsePaidStorageReport");

var parseReport = async (
  dateTo,
  dateFrom,
  report,
  paidStorageReport,
  totalAdCampaignCosts
) => {
  var skuNames = await getSkuNames(report);
  var totalFines = await calc.totalFines(report);
  var totalRevenue = await calc.totalRevenue(report);
  var totalSold = await calc.totalSold(report, skuNames);
  var totalReturnAmount = await calc.totalReturnAmount(report);
  var totalStorageCost = await calc.totalStorageCost(report);
  var totalDeliveryCost = await calc.totalDeliveryCost(report);
  var totalRetailAmount = await calc.totalRetailAmount(report);
  var totalTaxAmount = await calc.totalTaxAmount(totalRetailAmount);
  var totalPaidAcceptance = await calc.totalPaidAcceptance(report);
  var totalDeductionOrPayment = await calc.totalDeductionOrPayment(report);

  var totalNetProfit = await calc.totalNetProfit(
    totalRevenue,
    totalStorageCost,
    totalDeliveryCost,
    totalPaidAcceptance,
    totalAdCampaignCosts
  );

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(
    paidStorageReport
  );

  var skus = [];

  for (var skuName of skuNames) {
    var skuFilteredReport = report.filter((sku) => sku.sa_name === skuName);

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

    var taxPerSKU = await calc.taxPerSKU(retailAmountPerSKU);

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
    dateTo,
    totalSold,
    dateFrom,
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

module.exports = parseReport;
