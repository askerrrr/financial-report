var recalculateReportsTaxRate = require("../services/recalculateReportsTaxRate");

var recalculateReportsParamsAfterChangingTaxRate = async (req, res, next) => {
  var year = req.year;
  var taxRate = req.taxRate;
  var userId = req.app.locals.userId;
  var { getReportsByUserId, saveUpdatedReports } =
    req.app.locals.reportCollectionServices;

  var reports = await getReportsByUserId(userId);

  if (reports.length == 0) {
    return res.sendStatus(200);
  }

  reports = await recalculateReportsTaxRate(taxRate, year, reports);

  var successUpdate = await saveUpdatedReports(userId, reports);

  if (successUpdate) {
    return res.sendStatus(200);
  }

  return res.sendStatus(304);
};

module.exports = recalculateReportsParamsAfterChangingTaxRate;
