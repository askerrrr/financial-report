var { Schema } = require("mongoose");

var taxParamsSchema = new Schema({
  userId: { type: String, required: true },
  year: { type: Number, required: false },
  taxRate: { type: Number, default: 6 },
  paidTaxAmount: { type: Number, default: 0 },
  insuranceFeePercentage: { type: Number, default: 10 },
  paidInsuranceFee: { type: Number, default: 0 },
  isInsuranceFeePaid: { type: Boolean, default: false },
  mandatoryInsuranceFee: { type: Number, default: 0 },
});

module.exports = taxParamsSchema;
