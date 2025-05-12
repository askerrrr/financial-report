var { Schema } = require("mongoose");

var numOptions = [
  {
    type: Number,
    required: true,
  },
];

var strOptions = [
  {
    type: String,
    required: true,
  },
];

var reportSchema = new Schema({
  itemName: strOptions,
  article: strOptions,
  WBSalesAmount: numOptions,
  qty: numOptions,
  buyoutPrice: numOptions,
  deliveryCost: numOptions,
  refundCost: numOptions,
  numberOfReturns: numOptions,
  files: numOptions,
  allowances: numOptions,
  summaryData: {
    totalSum: { type: Number, required: true },
    storageCost: { type: Number, required: true },
    payoutsPerProduct: numOptions,
    differentDeductions: { type: Number, required: true },
    paidAcceptanceOfGoods: { type: Number, required: true },
  },
  averageCost: numOptions,
});

module.exports = reportSchema;
