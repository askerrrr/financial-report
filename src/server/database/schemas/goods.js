var { Schema } = require("mongoose");

var skuSchema = new Schema(
  {
    id: { type: Number, required: true },
    skuName: { type: String, required: true },
    price: { type: Number, required: false },
    discount: { type: Number, required: false },
    discountedPrice: { type: Number, required: false },
    clubDiscountedPrice: { type: Number, required: false },
    disabled: { type: Boolean, default: false },
    lastFetch: { type: Date, default: () => new Date(Date.now() + 3 * 60 * 60 * 1000) },
    lastUpdated: { type: Date, required: false },
    isPriceUpdated: { type: Boolean, required: false },
    errorText: { type: String, requred: false },
  },
  { _id: false }
);

var goodsSchema = new Schema({
  userId: { type: String, required: true },
  listGoods: [{ type: skuSchema, required: true }],
});

module.exports = goodsSchema;
