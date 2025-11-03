var { Schema } = require("mongoose");

var skuSchema = new Schema(
  {
    id: { type: Number, required: true },
    skuName: { type: String, required: true },
    price: { type: Number, required: false },
    discount: { type: Number, required: false },
    discountedPrice: { type: Number, required: false },
    clubDiscountedPrice: { type: Number, required: false },
    hidden: { type: Boolean, default: false },
  },
  { _id: false }
);

var weekDaySchema = new Schema(
  {
    nmID: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
  },
  { _id: false }
);

var goodsSchema = new Schema({
  userId: { type: String, required: true },
  listGoods: [{ type: skuSchema, required: true }],
  weeklyPricesAndDiscounts: [{ type: [weekDaySchema], required: false }],
});

module.exports = goodsSchema;
