import Joi from "joi";

var skuNamesArraySchema = Joi.array().items(Joi.string().required()).empty(Joi.array().length(0 ));

var schema = Joi.object({ userId: Joi.string().required(), reportId: Joi.number().required(), skuNames: skuNamesArraySchema });

export default schema;
