var { dbClient } = require("../../../database");
var getTaxParamKeyName = require("../services/getTaxParamKeyName");
var defaultTaxParams = require("../../../database/defaultTaxParams");
var recalculateReportsWithNewTaxRate = require("../services/recalculateReportsWithNewTaxRate");

var changeTaxParams = async (req, res, next) => {
  var userId = req.app.locals.userId;
  var { year, oldTaxParams, recalculate, data } = req.body;
  var { getReportsByUserId } = req.app.locals.reportCollectionServices;
  var { changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var { taxParamKeyName } = getTaxParamKeyName(data);

  var session = await dbClient.startSession();

  await session.withTransaction(async () => {
    var reportsData = await getReportsByUserId(userId, session);
    var reports = reportsData.reports.filter((report) => report.recordTo.year === year);

    var success = await changeTaxParamsToDb(userId, year, session, data);
  });

  if (success) {
    return res.sendStatus(200);
  }

  return res.sendStatus(304);
};

module.exports = changeTaxParams;
