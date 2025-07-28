var { Schema } = require("mongoose");

var taxParamsSchema = new Schema({
  userId: { type: String, required: true },
  taxRate: { type: Number, default: 6 },
  insuranceFeePercentage: { type: Number, default: 10 },
  mandatoryInsurancePremiums: { type: Number, default: 0 },
});

module.exports = taxParamsSchema;
