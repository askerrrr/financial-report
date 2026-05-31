import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().required(),
  skuName: Joi.string().required(),
  disableStatus: Joi.boolean().required(),
  nmID: Joi.number(),
});

export default schema;
