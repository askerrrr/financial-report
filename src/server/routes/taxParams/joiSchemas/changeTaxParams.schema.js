import Joi from "joi";

var dataObjectSchema = Joi.object({
  taxRate: Joi.number(),
  mandatoryInsuranceFeeRate: Joi.number(),
  mandatoryInsuranceFee: Joi.number(),
});

var oldTaxParamsObjectSchema = Joi.object({
  year: Joi.number(),
  taxRate: Joi.number(),
  finalProfit: Joi.number(),
  retailAmount: Joi.number(),
  paidTaxAmount: Joi.number(),
  schemaVersion: Joi.number(),
  maxInsuranceFee: Joi.number(),
  paidInsuranceFee: Joi.number(),
  excessInsuranceRate: Joi.number(),
  isInsuranceFeePaid: Joi.boolean(),
  mandatoryInsuranceFee: Joi.number(),
  insuranceFeePercentage: Joi.number(),
  additionalInsuranceFee: Joi.number(),
  otherExpenses: Joi.number().required(),
  taxableAmount: Joi.number().required(),
  mandatoryInsuranceFeeRate: Joi.number(),
  hasExcessIncomeForInsurance: Joi.boolean(),
  mandatoryInsuranceFeeIsPaid: Joi.boolean(),
  additionalInsuranceFeeIsPaid: Joi.boolean(),
  requiresAdditionalInsuranceFee: Joi.boolean(),
  excessIncomeForAdditionalInsuranceFee: Joi.number(),
});

var schema = Joi.object({
  data: dataObjectSchema,
  year: Joi.number().required(),
  userId: Joi.string().required(),
  oldTaxParams: oldTaxParamsObjectSchema,
  reportsNeedRecalculation: Joi.boolean().required(),
});

export default schema;
