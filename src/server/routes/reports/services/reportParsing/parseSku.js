import calc from "../calcServices/index.js";
import { skuSchemaVersion } from "../../../../database/migration/schemaVersioning/reportsCollection.js";

var parseSku = async (name, skuQty, skuFilteredReport, storageData, taxRate, totals, propPostfix = "") => {
  var { totalSold, totalStorageCost, totalAdvertisingCosts } = totals;

  var sku = {};

  sku["finalProfit" + propPostfix] = 0;
  sku["insuranceFee" + propPostfix] = 0;
  sku["productCosts" + propPostfix] = 0;
  sku["preTaxProfit" + propPostfix] = 0;
  sku["profitMargin" + propPostfix] = 0;
  sku["otherExpenses" + propPostfix] = 0;

  sku["qty" + propPostfix] = await calc.quantity(skuFilteredReport);
  sku["taxableAmount" + propPostfix] = calc.taxableAmount(skuFilteredReport);
  sku["fines" + propPostfix] = calc.sum(skuFilteredReport, "penalty", "truncate-on");
  sku["acceptance" + propPostfix] = calc.sum(skuFilteredReport, "paidAcceptance", "truncate-on");
  sku["retailAmount" + propPostfix] = calc.retailAmount(skuFilteredReport);
  sku["tax" + propPostfix] = calc.taxAmount(sku["taxableAmount" + propPostfix], taxRate);
  sku["returnAmount" + propPostfix] = calc.returnAmount(skuFilteredReport);
  sku["deliveryCost" + propPostfix] = calc.sum(skuFilteredReport, "deliveryService ", "truncate-on");
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
