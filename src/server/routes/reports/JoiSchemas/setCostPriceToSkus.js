import Joi from "joi";

var costPricesItemSchema = Joi.object({ id: Joi.number().required(), year: Joi.number(), skuName: Joi.string().required(), lastCostPrice: Joi.number().required() });

var schema = Joi.object({
  userId: Joi.string().required(),
  reportId: Joi.number().required(),
  taxYear: Joi.number().required(),
  costPrices: Joi.array().items(costPricesItemSchema).required(),
});

export default schema;
