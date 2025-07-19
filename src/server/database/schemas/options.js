var { Schema } = require("mongoose");

var optionsSchema = new Schema({
  userId: { type: String, required: true },
  taxRate: { type: Number, default: 6 },
});

module.exports = optionsSchema;
