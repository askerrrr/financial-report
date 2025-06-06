var { Schema } = require("mongoose");

var numOptions = { type: Number, default: 0 };
var strOptions = { type: String, required: true };

var itemsSchema = new Schema(
  {
    itemName: strOptions,
    qty: numOptions,
    costPrice: numOptions,
    returnAmount: numOptions,
    revenuePerItem: numOptions,
    averageRetailPrice: numOptions,
    averageStorageCost: numOptions,
    finesPerItem: numOptions,
    netProfitPerItem: numOptions,
    netProfitMargin: numOptions,
    deliveryCostPerItem: numOptions,
    storageCostPerItem: numOptions,
    finalNetProfitPerItem: numOptions,
    averageFinalNetProfitPerItem: numOptions,
    averageNetProfitPerItem: numOptions,
  },
  { _id: false }
);

var reportSchema = new Schema(
  {
    reportId: strOptions,
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
    taxRate: { type: Number, default: 6 },
    items: [{ type: itemsSchema, required: true }],
  },
  { _id: false }
);

module.exports = reportSchema;
