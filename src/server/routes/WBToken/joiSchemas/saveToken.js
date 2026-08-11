import Joi from "joi";

var schema = Joi.object({ token: Joi.string().required(), userId: Joi.string().required() });

export default schema;
