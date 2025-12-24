var { dbClient } = require("../../../database");
var getTaxParamKeyName = require("../services/getTaxParamKeyName");
var defaultTaxParams = require("../../../database/defaultTaxParams");
var recalculateReportsWithNewTaxRate = require("../services/recalculateReportsWithNewTaxRate");

var changeTaxParams = async (req, res, next) => {
  var userId = req.app.locals.userId;
  var { year, oldTaxParams, recalculate, data } = req.body;
  var { changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;
  var { getReportsByUserId, saveUpdatedReports } = req.app.locals.reportCollectionServices;

  var { taxParamKeyName } = getTaxParamKeyName(data);

  var session = await dbClient.startSession();

  await session.withTransaction(async () => {
    var reportsData = await getReportsByUserId(userId, session);
    var reports = reportsData.reports.filter((report) => report.recordTo.year == year);

    switch (taxParamKeyName) {
      case "taxRate":
        var newTaxRate = data[taxParamKeyName];
        var resetPaidTaxAmount = -oldTaxParams.mandatoryInsuranceFee;
        var { reports, finalProfit, paidTaxAmount } = recalculateReportsWithNewTaxRate(reports, resetPaidTaxAmount, newTaxRate);
        await saveUpdatedReports(userId, reports, session);
        await changeTaxParamsToDb(userId, year, session, { finalProfit, paidTaxAmount, taxRate: newTaxRate});
        break;
    }
  });

  return res.sendStatus(200);
};

module.exports = changeTaxParams;
