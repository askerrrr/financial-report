import Joi from "joi";
import dbUtils from '../../../database/collections/index.js'

var schema = Joi.object({ userId: Joi.string().required(), reportIds: Joi.array().items(Joi.number().required()).required() });

var projectonFields = [
  "reports.reportId",
  "reports.totalTaxAmount",
  "reports.totalFinalProfit",
  "reports.totalProductCosts",
  "reports.isFinancesAccounted",
];

var getReports = async (req, res, next) => {
  var { userId, reportIds } = req.body;

  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { getReportsByUserId } = dbUtils.reportCollectionServices;

  var { reports } = await getReportsByUserId(userId, null, projectonFields, reportIds);

  return res.json({ reports });
};

export default getReports;
