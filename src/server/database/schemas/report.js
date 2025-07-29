var { Schema } = require("mongoose");

var numOptions = { type: Number, default: 0 };
var strOptions = { type: String, required: true };

var SKUSchema = new Schema(
  {
    skuName: strOptions,
    qty: numOptions,
    costPrice: numOptions,
    returnAmount: numOptions,
    revenuePerSKU: numOptions,
    averageRetailPrice: numOptions,
    averageStorageCost: numOptions,
    finesPerSKU: numOptions,
    profitPerSKU: numOptions,
    profitMargin: numOptions,
    deliveryCostPerSKU: numOptions,
    storageCostPerSKU: numOptions,
    acceptancePerSKU: numOptions,
    taxPerSKU: numOptions,
    insuranceFee: numOptions,
    returnAmountPerSKU: numOptions,
    preTaxProfitPerSKU: numOptions,
    finalProfitPerSKU: numOptions,
    averageFinalProfitPerSKU: numOptions,
    retailAmountPerSKU: numOptions,
    deductionOrPayment: numOptions,
    averageProfitPerSKU: numOptions,
    averageAdvertisingCostPerSKU: numOptions,
  },
  { _id: false }
);

var recordToSchema = new Schema(
  { year: strOptions, month: strOptions },
  { _id: false }
);

var reportSchema = new Schema(
  {
    userId: strOptions,
    reportId: numOptions,
    dateFrom: strOptions,
    dateTo: strOptions,
    totalRevenue: numOptions,
    totalSold: numOptions,
    totalFines: numOptions,
    productCosts: numOptions,
    totalProfit: numOptions,
    totalInsuranceFee: numOptions,
    totalFinalProfit: numOptions,
    totalProfitMargin: numOptions,
    totalReturnAmount: numOptions,
    totalStorageCost: numOptions,
    totalDeliveryCost: numOptions,
    totalRetailAmount: numOptions,
    totalTaxAmount: numOptions,
    totalPaidAcceptance: numOptions,
    totalPreTaxProfit: numOptions,
    totalDeductionOrPayment: numOptions,
    taxRate: { type: Number, default: 6 },
    totalAdCampaignCosts: numOptions,
    recordTo: { type: recordToSchema, requred: true },
    skus: [{ type: SKUSchema, required: true }],
  },
  { _id: false }
);

module.exports = reportSchema;
