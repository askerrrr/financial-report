import Joi from "joi";

var abandonedReportPeriodsSchema = Joi.array().items({
  index: Joi.number().required(),
  dateTo: Joi.string().required(),
  dateFrom: Joi.string().required(),
  failedCount: Joi.number().required(),
});

var schema = Joi.object({ userId: Joi.string().required(), abandonedReportPeriods: abandonedReportPeriodsSchema });

export default schema;
