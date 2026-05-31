import Joi from "joi";

var skuNamesArraySchema = Joi.array().items(Joi.string().required());

var schema = Joi.object({ userId: Joi.string().required(), reportId: Joi.number().required(), skuNames: skuNamesArraySchema });

export default schema;
