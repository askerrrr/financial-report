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

  sku.schemaVersion = skuSchemaVersion;
  return sku;
};

export default parseSku;

var initSku = function (postfix) {
  var sku = {};

  if (!postfix) {
    sku.schemaVersion = skuSchemaVersion;
  }

  sku["qty" + postfix] = 0;
  sku["tax" + postfix] = 0;
  sku["fines" + postfix] = 0;
  sku["profit" + postfix] = 0;
  sku["costPrice" + postfix] = 0;
  sku["acceptance" + postfix] = 0;
  sku["storageCost" + postfix] = 0;
  sku["finalProfit" + postfix] = 0;
  sku["insuranceFee" + postfix] = 0;
  sku["returnAmount" + postfix] = 0;
  sku["profitMargin" + postfix] = 0;
  sku["deliveryCost" + postfix] = 0;
  sku["retailAmount" + postfix] = 0;
  sku["taxableAmount" + postfix] = 0;
  sku["averageProfit" + postfix] = 0;
  sku["otherExpenses" + postfix] = 0;
  sku["preTaxProfit" + postfix] = 0;
  sku["isCostPriceSet" + postfix] = false;
  sku["additionalPayment" + postfix] = 0;
  sku["deductionOrPayment" + postfix] = 0;
  sku["averageRetailPrice" + postfix] = 0;
  sku["sellerPayoutAmount" + postfix] = 0;
  sku["averageStorageCost" + postfix] = 0;
  sku["averageAdvertisingCost" + postfix] = 0;
  sku["additionalInsuranceFee" + postfix] = 0;
  sku["isInsuranceFeeIncluded" + postfix] = false;

  return sku;
};
