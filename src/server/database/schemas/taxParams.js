var { Schema } = require("mongoose");

var taxParamsSchema = new Schema({
  userId: { type: String, required: true },
  taxRate: { type: Number, default: 6 },
  paidTaxAmount: { type: Number, default: 0 },
  insuranceFeePercentage: { type: Number, default: 10 },
  paidInsurancePremiums: { type: Number, default: 0 },
  mandatoryInsurancePremiums: { type: Number, default: 0 },
});

module.exports = taxParamsSchema;
