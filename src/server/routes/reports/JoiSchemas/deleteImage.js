import Joi from "joi";

var schema = Joi.object({ userId: Joi.string().required(), skuName: Joi.string().required() });

export default schema;
