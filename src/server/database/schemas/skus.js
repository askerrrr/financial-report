var { Schema } = require("mongoose");

var SKUSchema = new Schema({
  name: { type: String, required: true },
  skuId: { type: Number, required: true },
  price: { type: Number, required: true },
  discont: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
});

var SKUsSchema = new Schema({ userId: { type: String, required: true }, skus: [{ type: SKUSchema, required: false }] });

module.exports = SKUsSchema;
