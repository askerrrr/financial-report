import Joi from "joi";

var abandonedReportPeriodsSchema = Joi.array()
  .items({
    index: Joi.number().required(),
    dateTo: Joi.string().required(),
    dateFrom: Joi.string().required(),
    failedCount: Joi.number().required(),
  })
  .min(0);

var schema = Joi.object({
  userId: Joi.string().required(),
  needToResumeLoading: Joi.boolean().required(),
  abandonedReportPeriods: abandonedReportPeriodsSchema,
});

export default schema;
