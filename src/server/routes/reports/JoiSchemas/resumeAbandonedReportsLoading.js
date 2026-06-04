import Joi from "joi";

var abandonedReporsSchema = Joi.array()
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
  abandonedReports: abandonedReporsSchema,
});

export default schema;
