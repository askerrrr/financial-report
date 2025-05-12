var { Schema } = require("mongoose");
var reportSchema = require("./reportSchems");

var schema = new Schema({
  userId: { type: String, required: true },
  login: { type: String, required: true },
  passwd: { type: String, required: true },
  reports: { type: [reportSchema], required: false },
});

module.exports = schema;
var obj = {
  itemName: [
    "Лента для медицинского бейджа",
    "Бейдж горизонтальный на ленте медицинский",
  ],
  article: ["лента-пофол", "бейдж-пофол"],
  WBSalesAmount: [1920, 2439],
  qty: [7, 8],
  buyoutPrice: [1544.56, 2105.42],
  deliveryCost: [521.2, 797.9],
  refundCost: [0, 0],
  numberOfReturns: [0, 0],
  fines: [0, 0],
  allowances: [0, 0],
  summaryData: {
    totalSum: 2220.14,
    storageCost: 110.74,
    payoutsPerProduct: [1023.36, 1307.52],
    differentDeductions: 0,
    paidAcceptanceOfGoods: 0,
  },
  averageCost: [146.19, 163.44],
};
