var Joi = require("joi");

var schema = Joi.object({ userId: Joi.string().required(), reportIds: Joi.array().items(Joi.number()).required() });

var checkAllCostPricesNonZero = async (req, res, next) => {
  var { error } = schema.validate(req.body);
  if (error) {
    return res.sendStatus(400);
  }

  var { userId, reportIds } = req.body;
  var { getReportById } = req.app.locals.reportCollectionServices;

  var reports = [];

  for (var reportId of reportIds) {
    var { report } = await getReportById(userId, reportId);

    reports.push(report);
  }

  var allCostPricesNonZero = reports.every((report) => report.skus.every((sku) => sku.costPrice > 0));

  if (!allCostPricesNonZero) {
    return res.sendStatus(400);
  }

  req.reports = reports;

  next();
};

module.exports = checkAllCostPricesNonZero;
