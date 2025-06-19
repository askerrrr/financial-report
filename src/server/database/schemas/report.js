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
    netProfitPerSKU: numOptions,
    netProfitMargin: numOptions,
    deliveryCostPerSKU: numOptions,
    storageCostPerSKU: numOptions,
    acceptancePerSKU: numOptions,
    taxPerSKU: numOptions,
    finalNetProfitPerSKU: numOptions,
    averageFinalNetProfitPerSKU: numOptions,
    retailAmountPerSKU: numOptions,
    deductionOrPayment: numOptions,
    averageNetProfitPerSKU: numOptions,
  },
  { _id: false }
);

var reportSchema = new Schema(
  {
    reportId: numOptions,
    dateFrom: strOptions,
    dateTo: strOptions,
    totalRevenue: numOptions,
    totalSold: numOptions,
    totalFines: numOptions,
    totalNetProfit: numOptions,
    totalFinalNetProfit: numOptions,
    totalNetProfitMargin: numOptions,
    totalStorageCost: numOptions,
    totalDeliveryCost: numOptions,
    totalRetailAmount: numOptions,
    totalTaxAmount: numOptions,
    totalPaidAcceptance: numOptions,
    totalDeductionOrPayment: numOptions,
    taxRate: { type: Number, default: 6 },
    totalAdCampaignCosts: numOptions,
    skus: [{ type: SKUSchema, required: true }],
  },
  { _id: false }
);

module.exports = reportSchema;
