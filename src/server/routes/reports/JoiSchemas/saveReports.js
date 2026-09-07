import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().uuid().required(),
  dateFrom: Joi.string().allow("").required(),
  dateTo: Joi.string().allow("").required(),
  needToLoadAllReports: Joi.boolean().required(),
  isPeriodWithinSameWeek: Joi.boolean().required(),
  requiredTokenType: Joi.string().valid("read").required(),
});

export default schema;
