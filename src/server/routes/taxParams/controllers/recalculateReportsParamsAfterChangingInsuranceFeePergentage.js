var recalculateReportsInsuranceFee = require("../services/recalculateReportsInsuranceFee");

var recalculateReportsParamsAfterChangingInsuranceFeePergentage = async (req, res, next) => {
  var { year, userId, percent } = req.body;
  var { getReportsByUserId, saveUpdatedReports } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb, changeInsuranceFeePercentageToDb, changePaidInsuranceFeeToDb } = req.app.locals.taxParamsCollectionServices;

  var reports = await getReportsByUserId(userId);
  var taxParams = await getTaxParamsFromDb(userId, year);

  var { reports, newPercent, recalculatedPaidInsuranceFee } = await recalculateReportsInsuranceFee(year, reports, percent, taxParams);

  await saveUpdatedReports(userId, reports);
  await changeInsuranceFeePercentageToDb(userId, year, newPercent);
  await changePaidInsuranceFeeToDb(userId, year, recalculatedPaidInsuranceFee);

  return res.sendStatus(200);
};

module.exports = recalculateReportsParamsAfterChangingInsuranceFeePergentage;
