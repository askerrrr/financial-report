import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().required(),
  reportId: Joi.number().required(),
  skuIndex: Joi.number().required(),
  skuId: Joi.number().required(),
  year: Joi.number().required(),
  skuName: Joi.string().required(),
  costPrice: Joi.number().required(),
  otherExpenses: Joi.number().required(),
});

export default schema;
