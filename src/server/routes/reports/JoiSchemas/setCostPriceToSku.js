import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().required(),
  reportId: Joi.number().required(),
  skuIndex: Joi.number().required(),
  skuId: Joi.number().required(),
  year: Joi.number().required(),
  skuName: Joi.string().required(),
  costPrice: Joi.number(),
  costPriceInCurrentYear: Joi.number(),
  costPriceInNextYear: Joi.number(),
  otherExpenses: Joi.number(),
  otherExpensesInCurrentYear: Joi.number(),
  otherExpensesInNextYear: Joi.number(),
});

export default schema;
