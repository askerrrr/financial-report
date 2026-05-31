import Joi from "joi";

var checkedWeekDaysArraySchema = Joi.array().items(Joi.number().required()).required();
var skuObjectSchema = Joi.object({ nmID: Joi.number().required(), price: Joi.number().required(), discount: Joi.number().required() });

var schema = Joi.object({
  sku: skuObjectSchema,
  userId: Joi.string().required(),
  setNewPriceNow: Joi.boolean().required(),
  expectedPriceExists: Joi.boolean().required(),
  checkedWeekDays: checkedWeekDaysArraySchema,
});

export default schema;
