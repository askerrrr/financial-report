import Joi from "joi";

var schema = Joi.object({ login: Joi.string().required(), passwd: Joi.string().required() });

export default schema;
