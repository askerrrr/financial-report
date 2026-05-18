import calc from "../calcServices/index.js";
import { skuSchemaVersion } from "../../../../database/migration/schemaVersioning/reportsCollection.js";

var parseSku = async (name, skuQty, skuFilteredReport, storageData, taxRate, totals, propPostfix = "") => {
  var { totalSold, totalStorageCost, totalAdvertisingCosts } = totals;

  var sku = initSku(propPostfix);

  sku["qty" + propPostfix] = await calc.quantity(skuFilteredReport);
  sku["taxableAmount" + propPostfix] = calc.taxableAmount(skuFilteredReport);
  sku["fines" + propPostfix] = calc.sum(skuFilteredReport, "penalty", "truncate-on");
  sku["acceptance" + propPostfix] = calc.sum(skuFilteredReport, "paidAcceptance", "truncate-on");
  sku["retailAmount" + propPostfix] = calc.retailAmount(skuFilteredReport);
  sku["tax" + propPostfix] = calc.taxAmount(sku["taxableAmount" + propPostfix], taxRate);
  sku["returnAmount" + propPostfix] = calc.returnAmount(skuFilteredReport);
  sku["deliveryCost" + propPostfix] = calc.sum(skuFilteredReport, "deliveryService", "truncate-on");
  sku["deductionOrPayment" + propPostfix] = calc.sum(skuFilteredReport, "deduction", "truncate-on");
  sku["additionalPayment" + propPostfix] = calc.sum(skuFilteredReport, "additionalPayment", "truncate-on");
  sku["sellerPayoutAmount" + propPostfix] = calc.sellerPayoutAmount(skuFilteredReport);
  sku["averageRetailPrice" + propPostfix] = calc.averageRetailPrice(sku["qty" + propPostfix], skuFilteredReport);
  sku["storageCost" + propPostfix] = calc.storageCost(name, storageData);
  sku["averageStorageCost" + propPostfix] = calc.averageStorageCost(totalStorageCost, totalSold, sku["qty" + propPostfix]);
  sku["averageAdvertisingCost" + propPostfix] = calc.averageAdvertisingCost(skuQty, totalAdvertisingCosts);
  sku["profit" + propPostfix] = calc.profit(sku, propPostfix);
  sku["averageProfit" + propPostfix] = calc.averageProfit(sku, propPostfix);
  sku.schemaVersion = skuSchemaVersion;
  return sku;
};

export default parseSku;

var initSku = function (postfix) {
  var sku = {};

  sku.qty = 0;
  sku.tax = 0;
  sku.fines = 0;
  sku.profit = 0;
  sku.costPrice = 0;
  sku.acceptance = 0;
  sku.storageCost = 0;
  sku.finalProfit = 0;
  sku.insuranceFee = 0;
  sku.returnAmount = 0;
  sku.profitMargin = 0;
  sku.deliveryCost = 0;
  sku.retailAmount = 0;
  sku.taxableAmount = 0;
  sku.averageProfit = 0;
  sku.otherExpenses = 0;
  sku.preTaxProfit = 0;
  sku.isCostPriceSet = false;
  sku.additionalPayment = 0;
  sku.deductionOrPayment = 0;
  sku.averageRetailPrice = 0;
  sku.sellerPayoutAmount = 0;
  sku.averageStorageCost = 0;
  sku.averageAdvertisingCost = 0;
  sku.additionalInsuranceFee = 0;
  sku.isInsuranceFeeIncluded = false;
  sku.schemaVersion = skuSchemaVersion;

  if (postfix) {
    sku.taxInCurrentYear = 0;
    sku.qtyInCurrentYear = 0;
    sku.finesInCurrentYear = 0;
    sku.profitInCurrentYear = 0;
    sku.acceptanceInCurrentYear = 0;
    sku.storageCostInCurrentYear = 0;
    sku.deliveryCostInCurrentYear = 0;
    sku.returnAmountInCurrentYear = 0;
    sku.insuranceFeeInCurrentYear = 0;
    sku.retailAmountInCurrentYear = 0;
    sku.taxableAmountInCurrentYear = 0;
    sku.otherExpensesInCurrentYear = 0;
    sku.finalProfitInCurrentYear = 0;
    sku.profitMarginInCurrentYear = 0;
    sku.preTaxProfitInCurrentYear = 0;
    sku.averageProfitInCurrentYear = 0;
    sku.averageRetailPriceInCurrentYear = 0;
    sku.averageStorageCostInCurrentYear = 0;
    sku.additionalPaymentInCurrentYear = 0;
    sku.sellerPayoutAmountInCurrentYear = 0;
    sku.deductionOrPaymentInCurrentYear = 0;
    sku.additionalInsuranceFeeInCurrentYear = 0;
    sku.averageAdvertisingCostInCurrentYear = 0;
    sku.isInsuranceFeeIncludedInCurrentYear = false;

    sku.taxInNextYear = 0;
    sku.qtyInNextYear = 0;
    sku.finesInNextYear = 0;
    sku.profitInNextYear = 0;
    sku.acceptanceInNextYear = 0;
    sku.storageCostInNextYear = 0;
    sku.deliveryCostInNextYear = 0;
    sku.returnAmountInNextYear = 0;
    sku.insuranceFeeInNextYear = 0;
    sku.retailAmountInNextYear = 0;
    sku.taxableAmountInNextYear = 0;
    sku.otherExpensesInNextYear = 0;
    sku.finalProfitInNextYear = 0;
    sku.profitMarginInNextYear = 0;
    sku.preTaxProfitInNextYear = 0;
    sku.averageProfitInNextYear = 0;
    sku.averageRetailPriceInNextYear = 0;
    sku.averageStorageCostInNextYear = 0;
    sku.additionalPaymentInNextYear = 0;
    sku.sellerPayoutAmountInNextYear = 0;
    sku.deductionOrPaymentInNextYear = 0;
    sku.additionalInsuranceFeeInNextYear = 0;
    sku.averageAdvertisingCostInNextYear = 0;
    sku.isInsuranceFeeIncludedInNextYear = false;
  }

  return sku
};
