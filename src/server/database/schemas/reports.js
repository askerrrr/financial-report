var { Schema } = require("mongoose");

var booleanOptions = { type: Boolean };
var numberOptions = { type: Number, default: 0 };
var stringOptions = { type: String, required: true };

var SKUSchema = new Schema(
  {
    skuName: stringOptions,
    qty: numberOptions,
    costPrice: numberOptions,
    revenue: numberOptions,
    sellerPayoutAmount: numberOptions,
    fines: numberOptions,
    returnAmount: numberOptions,
    retailAmount: numberOptions,
    deliveryCost: numberOptions,
    storageCost: numberOptions,
    acceptance: numberOptions,
    deductionOrPayment: numberOptions,
    additionalPayment: numberOptions,
    tax: numberOptions,
    insuranceFee: numberOptions,
    profit: numberOptions,
    preTaxProfit: numberOptions,
    finalProfit: numberOptions,
    profitMargin: numberOptions,
    isCostPriceSet: { type: Boolean, default: false },
    isInsuranceFeeIncluded: booleanOptions,
    averageProfit: numberOptions,
    averageRetailPrice: numberOptions,
    averageStorageCost: numberOptions,
    averageAdvertisingCost: numberOptions,
    schemaVersion: { type: Number },
    id: { type: Number, required: true },
  },
  { _id: false }
);

var recordToSchema = new Schema(
  { year: stringOptions, month: stringOptions, schemaVersion: { type: Number } },
  { _id: false }
);

var reportSchema = new Schema(
  {
    userId: stringOptions,
    reportId: numberOptions,
    dateFrom: stringOptions,
    dateTo: stringOptions,
    totalSellerPayoutAmount: numberOptions,
    totalSold: numberOptions,
    totalFines: numberOptions,
    totalProductCosts: numberOptions,
    totalReturnAmount: numberOptions,
    totalStorageCost: numberOptions,
    totalDeliveryCost: numberOptions,
    totalRetailAmount: numberOptions,
    totalPaidAcceptance: numberOptions,
    totalAdvertisingCosts: numberOptions,
    totalDeductionOrPayment: numberOptions,
    TotalAdditionalPayment: numberOptions,
    totalTaxAmount: numberOptions,
    totalInsuranceFee: numberOptions,
    totalProfit: numberOptions,
    totalPreTaxProfit: numberOptions,
    totalFinalProfit: numberOptions,
    totalProfitMargin: numberOptions,
    taxRate: { type: Number, default: 6 },
    recordTo: { type: recordToSchema, requred: true },
    skus: [{ type: SKUSchema, required: true }],
    schemaVersion: { type: Number },
  },
  { _id: false }
);

var reportsSchema = new Schema({
  userId: stringOptions,
  reports: { type: [reportSchema], required: false },
  schemaVersion: { type: Number },
});

module.exports = { SKUSchema, reportSchema, reportsSchema };
