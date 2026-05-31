import Joi from "joi";

var schema = Joi.object({ skuName: Joi.string().required() });

export default schema;
