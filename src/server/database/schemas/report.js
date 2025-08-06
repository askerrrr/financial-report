var { Schema } = require("mongoose");

var numberOptions = { type: Number, default: 0 };
var stringOptions = { type: String, required: true };
var booleanOptions = { type: Boolean, default: true };

var SKUSchema = new Schema(
  {
    skuName: stringOptions,
    qty: numberOptions,
    costPrice: numberOptions,
    returnAmount: numberOptions,
    revenuePerSKU: numberOptions,
    averageRetailPrice: numberOptions,
    averageStorageCost: numberOptions,
    finesPerSKU: numberOptions,
    profitPerSKU: numberOptions,
    profitMargin: numberOptions,
    deliveryCostPerSKU: numberOptions,
    storageCostPerSKU: numberOptions,
    acceptancePerSKU: numberOptions,
    taxPerSKU: numberOptions,
    insuranceFee: numberOptions,
    returnAmountPerSKU: numberOptions,
    preTaxProfitPerSKU: numberOptions,
    finalProfitPerSKU: numberOptions,
    averageFinalProfitPerSKU: numberOptions,
    retailAmountPerSKU: numberOptions,
    deductionOrPayment: numberOptions,
    averageProfitPerSKU: numberOptions,
    isInsuranceFeeIncluded: booleanOptions,
    averageAdvertisingCostPerSKU: numberOptions,
  },
  { _id: false }
);

var recordToSchema = new Schema(
  { year: stringOptions, month: stringOptions },
  { _id: false }
);

var reportSchema = new Schema(
  {
    userId: stringOptions,
    reportId: numberOptions,
    dateFrom: stringOptions,
    dateTo: stringOptions,
    totalRevenue: numberOptions,
    totalSold: numberOptions,
    totalFines: numberOptions,
    productCosts: numberOptions,
    totalProfit: numberOptions,
    totalInsuranceFee: numberOptions,
    totalFinalProfit: numberOptions,
    totalProfitMargin: numberOptions,
    totalReturnAmount: numberOptions,
    totalStorageCost: numberOptions,
    totalDeliveryCost: numberOptions,
    totalRetailAmount: numberOptions,
    totalTaxAmount: numberOptions,
    totalPaidAcceptance: numberOptions,
    totalPreTaxProfit: numberOptions,
    totalDeductionOrPayment: numberOptions,
    taxRate: { type: Number, default: 6 },
    totalAdCampaignCosts: numberOptions,
    recordTo: { type: recordToSchema, requred: true },
    skus: [{ type: SKUSchema, required: true }],
  },
  { _id: false }
);

module.exports = reportSchema;
