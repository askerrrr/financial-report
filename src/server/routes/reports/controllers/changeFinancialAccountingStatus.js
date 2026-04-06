import Joi from "joi";
import dbUtils from "../../../database/collections/index.js";

var schema = Joi.object({ userId: Joi.string().required(), reportId: Joi.number().required(), newStatus: Joi.boolean().required() });

var changeFinancialAccountingStatus = async (req, res) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { userId, reportId, newStatus } = req.body;

  var { updateReportFinancialAccountingStatus } = dbUtils.reportCollectionServices;

  await updateReportFinancialAccountingStatus(userId, reportId, newStatus);
  return res.sendStatus(200);
};

export default changeFinancialAccountingStatus;
