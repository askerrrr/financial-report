var { Schema } = require("mongoose");

var taxYear = new Schema(
  {
    year: { type: Number, required: true },
    taxRate: { type: Number, default: 6 },
    paidTaxAmount: { type: Number, default: 0 },
    mandatoryInsuranceFee: { type: Number, default: 0 },
    insuranceFeePercentage: { type: Number, default: 10 },
    paidInsuranceFee: { type: Number, default: 0 },
    retailAmount: { type: Number, default: 0 },
    isInsuranceFeePaid: { type: Boolean, default: false },
    additionalInsuranceFee: { type: Number, default: 0 },
    requiresAdditionalInsuranceFee: { type: Boolean, default: false },
    excessIncomeForInsurance: { type: Number },
    hasExcessIncomeForInsurance: { type: Boolean, default: false },
    excessInsuranceRate: { type: Number, default: 1 },
    schemaVersion: { type: Number },
  },
  { _id: false }
);

var taxParamsSchema = new Schema({
  userId: { type: String, required: true },
  years: [{ type: taxYear, required: false }],
  schemaVersion: { type: Number },
});

module.exports = taxParamsSchema;
