var { Schema } = require("mongoose");

var numOptions = {
  type: Number,
  required: true,
};

var strOptions = {
  type: String,
  required: true,
};

var itemsSchema = new Schema(
  {
    qty: numOptions,
    fines: numOptions,
    article: strOptions,
    itemName: strOptions,
    refundCost: numOptions,
    allowances: numOptions,
    averageCost: numOptions,
    buyoutPrice: numOptions,
    deliveryCost: numOptions,
    WBSalesAmount: numOptions,
    numberOfReturns: numOptions,
    payoutsPerProduct: numOptions,
  },
  { _id: false }
);

var reportDetailSchema = new Schema(
  {
    id: strOptions,
    date: { type: String, default: "" },
    period: { type: String, default: "" },
    totalSum: numOptions,
    storageCost: numOptions,
    differentDeductions: numOptions,
    paidAcceptanceOfGoods: numOptions,
    items: [{ type: itemsSchema, required: true }],
  },
  { _id: false }
);

module.exports = reportDetailSchema;
