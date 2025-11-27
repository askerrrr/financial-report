var { Schema } = require("mongoose");

var skuSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    lastCostPrice: { type: Number, required: false },
  },
  { _id: false }
);

var skusSchema = new Schema({ userId: { type: String, required: true }, skus: [{ type: skuSchema, required: false }] });

module.exports = skusSchema;
