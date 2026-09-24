import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().uuid().required(),
  tokenType: Joi.string().valid("read", "set").required(),
});

export default schema;
