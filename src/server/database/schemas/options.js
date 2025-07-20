var { Schema } = require("mongoose");

var optionsSchema = new Schema({
  userId: { type: String, required: true },
  taxRate: { type: Number, default: 6 },
  mandatoryInsurancePremiums: { type: Number, default: 0 },
});

module.exports = optionsSchema;
