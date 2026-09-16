import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().uuid().required(),
  requiredTokenType: Joi.string().valid("read").required(),
});

export default schema;
