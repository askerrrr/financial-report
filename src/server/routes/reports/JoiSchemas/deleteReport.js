import Joi from "joi";

var skuNamesArray1Schema = Joi.array().items(Joi.string().required());

var schema = Joi.object({ userId: Joi.string().required(), reportId: Joi.number().required(), skuNames: skuNamesArray1Schema });

export default schema;
