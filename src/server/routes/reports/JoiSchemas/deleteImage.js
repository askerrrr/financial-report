import Joi from "joi";

var schema = Joi.object({
  objectKey: Joi.string().required(),
});

export default schema;
