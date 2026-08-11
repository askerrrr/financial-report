import Joi from "joi";

var schema = Joi.object({ userId: Joi.string().required(), reportIds: Joi.array().items(Joi.number()).required() });

export default schema;
