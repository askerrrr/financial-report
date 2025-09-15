var { Schema } = require("mongoose");

var SKUSchema = new Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
  price: { type: Number, default: 0 },
  discont: { type: Number, default: 0 },
  discountedPrice: { type: Number, default: 0 },
});

var SKUsSchema = new Schema({ userId: { type: String, required: true }, skus: [{ type: SKUSchema, required: false }] });

module.exports = SKUsSchema;
