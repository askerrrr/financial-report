var { Schema } = require("mongoose");

var numOptions = { type: Number, default: 0 };
var strOptions = { type: String, required: true };

var itemsSchema = new Schema({
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
  finalNetProfitPerItem: numOptions,
  averageFinalNetProfitPerItem: numOptions,
  averageNetProfitPerItem: numOptions,
});

var reportSchema = new Schema({
  reportId: strOptions,
  dateFrom: strOptions,
  dateTo: strOptions,
  totalRevenue: numOptions,
  totalSold: numOptions,
  totalFines: numOptions,
  totalNetProfit: numOptions,
  totalNetProfitMargin: numOptions,
  totalStorageCost: numOptions,
  totalDeliveryCost: numOptions,
  items: [{ type: itemsSchema, required: true }],
});

module.exports = reportSchema;
