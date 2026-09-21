import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().uuid().required(),
  requiredTokenType: Joi.string().valid("set").required(),
});

export default schema;
