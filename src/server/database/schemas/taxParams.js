var { Schema } = require("mongoose");

var taxYear = new Schema(
  {
    year: { type: Number, required: true },
    taxRate: { type: Number, default: 6 },
    paidTaxAmount: { type: Number, default: 0 },
    mandatoryInsuranceFee: { type: Number, default: 0 },
    insuranceFeePercentage: { type: Number, default: 10 },
    paidInsuranceFee: { type: Number, default: 0 },
    isInsuranceFeePaid: { type: Boolean, default: false },
  },
  { _id: false }
);

var taxParamsSchema = new Schema({
  userId: { type: String, required: true },
  years: [{ type: taxYear, required: false }],
});

module.exports = taxParamsSchema;
