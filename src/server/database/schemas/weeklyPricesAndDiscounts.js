import { Schema } from "mongoose";

var weekDaySchema = new Schema(
  {
    nmID: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
  },
  { _id: false },
);

var weeklyPricesAndDiscountsSchema = new Schema({
  userId: { type: String, required: true },
  uploadId: { type: Number, required: false },
  weeklyPricesAndDiscounts: [{ type: [weekDaySchema], required: false }],
});

export default weeklyPricesAndDiscountsSchema;
