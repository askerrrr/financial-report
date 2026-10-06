import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().required(),
  skuName: Joi.string().required(),
  fileType: Joi.string()
    .valid("image/jpg", "image/jpeg", "image/png")
    .required(),
});

export default schema;
