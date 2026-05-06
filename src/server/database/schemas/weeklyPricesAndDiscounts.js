import { Schema } from "mongoose";

var priceAndDiscountSchema = new Schema(
  {
    nmID: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
  },
  { _id: false },
);

var skuSchema = new Schema(
  {
    needToUpdate: { type: Boolean, default: true },
    lastUpdatedTimestamp: { type: Date, default: 0 },
    priceOrDiscountUpdateInterval: { type: String, default: "5m" },
    priceOrDiscountUpdateIntervalInMs: { type: Number, default: 300000 },
    data: { type: priceAndDiscountSchema, required: false },
  },
  { _id: false },
);

var weeklyPricesAndDiscountsSchema = new Schema({
  userId: { type: String, required: true },
  uploadId: { type: Number, required: false },
  weeklyPricesAndDiscounts: [{ type: [skuSchema], required: false }],
});

export default weeklyPricesAndDiscountsSchema;
