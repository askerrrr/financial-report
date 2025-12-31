var { dbClient } = require("../../../database");
var getTaxParamKeyName = require("../services/getTaxParamKeyName");
var defaultTaxParams = require("../../../database/defaultTaxParams");
var recalculateReportsWithNewTaxRate = require("../services/recalculateReportsWithNewTaxRate");
var recalculateReportsWithNewMandatoryInsuranceRate = require("../services/recalculateReportsWithNewMandatoryInsuranceRate");

var changeTaxParams = async (req, res, next) => {
  var userId = req.app.locals.userId;
  var { year, oldTaxParams, recalculate, data } = req.body;
  var { changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;
  var { getReportsByUserId, saveUpdatedReports } = req.app.locals.reportCollectionServices;

  var { taxParamKeyName } = getTaxParamKeyName(data);

  if (!recalculate) {
    try {
      await changeTaxParamsToDb(userId, year, null, data);
      res.sendStatus(200);
    } catch (e) {
      res.sendStatus(304);
    }

    return;
  }

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var reportsData = await getReportsByUserId(userId, session);
      var reports = reportsData.reports.filter((report) => report.recordTo.year == year);

      switch (taxParamKeyName) {
        case "taxRate":
          var newTaxRate = data[taxParamKeyName];
          var resetPaidTaxAmount = -oldTaxParams.mandatoryInsuranceFee;
          var { reports, finalProfit, paidTaxAmount } = recalculateReportsWithNewTaxRate(reports, resetPaidTaxAmount, newTaxRate, year);
          await saveUpdatedReports(userId, reports, session);
          await changeTaxParamsToDb(userId, year, session, { finalProfit, paidTaxAmount, taxRate: newTaxRate });
          break;
        case "mandatoryInsuranceFeeRate":
          var { mandatoryInsuranceFee } = oldTaxParams;
          var newMandatoryInsuranceRate = data[taxParamKeyName];
          var { reports, ...updatedTaxParams } = recalculateReportsWithNewMandatoryInsuranceRate(
            reports,
            mandatoryInsuranceFee,
            newMandatoryInsuranceRate,
            year
          );

          await saveUpdatedReports(userId, reports, session);
          await changeTaxParamsToDb(userId, year, session, updatedTaxParams);
          break;
	case "mandatoryInsuranceFee": 
          var newMandatoryInsuranceFee = data[taxParamKeyName];
          
          break;
      }
    });

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(304);
  } finally {
    if (session && session.inTransaction()) {
      await session.endSession();
    }
  }
};

module.exports = changeTaxParams;
