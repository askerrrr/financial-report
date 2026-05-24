import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().required(),
  dateFrom: Joi.string().allow("").required(),
  dateTo: Joi.string().allow("").required(),
  uploadAllReports: Joi.boolean().required(),
  isPeriodWithinSameWeek: Joi.boolean().required(),
});

export default schema;
