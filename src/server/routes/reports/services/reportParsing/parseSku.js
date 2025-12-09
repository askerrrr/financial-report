var calc = require("../calcServices");
var { skuSchemaVersion } = require("../../../../database/migration/schemaVersioning/reportsCollection");

var parseSku = async (name, skuFilteredReport, storageData, taxRate, totals, propPostfix = "") => {
  var { totalSold, totalStorageCost, totalAdvertisingCosts } = totals;

  var sku = {};
  sku["qty" + propPostfix] = await calc.quantity(skuFilteredReport);
  sku["fines" + propPostfix] = calc.sum(skuFilteredReport, "penalty");
  sku["acceptance" + propPostfix] = calc.sum(skuFilteredReport, "acceptance");
  sku["retailAmount" + propPostfix] = calc.sum(skuFilteredReport, "retail_amount");
  sku["tax" + propPostfix] = calc.taxAmount(sku["retailAmount" + propPostfix], taxRate);
  sku["returnAmount" + propPostfix] = calc.sum(skuFilteredReport, "return_amount");
  sku["deliveryCost" + propPostfix] = calc.sum(skuFilteredReport, "delivery_rub");
  sku["deductionOrPayment" + propPostfix] = calc.sum(skuFilteredReport, "deduction");
  sku["additionalPayment" + propPostfix] = calc.sum(skuFilteredReport, "additional_payment");
  sku["sellerPayoutAmount" + propPostfix] = calc.sum(skuFilteredReport, "ppvz_for_pay");
  sku["averageRetailPrice" + propPostfix] = calc.averageRetailPrice(sku["qty" + propPostfix], skuFilteredReport);
  sku["storageCost" + propPostfix] = calc.storageCost(name, storageData);
  sku["averageStorageCost" + propPostfix] = calc.averageStorageCost(totalStorageCost, totalSold, sku["qty" + propPostfix]);
  sku["averageAdvertisingCost" + propPostfix] = calc.averageAdvertisingCost(skuNamesAndIds.length, totalAdvertisingCosts);
  sku["profit" + propPostfix] = calc.profit(sku);
  sku["averageProfit" + propPostfix] = calc.averageProfit(sku);
  sku.schemaVersion = skuSchemaVersion;
  return sku;
};

module.exports = parseSku;
