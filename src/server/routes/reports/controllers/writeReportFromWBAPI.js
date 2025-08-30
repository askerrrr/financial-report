var parseReports = require("../services/writeAndCalcReportDataFromWBAPI/index");
var insertReportToReportTree = require("../services/reportTreeBuilder");
var sortYearsTree = require("../services/different/sortYearTree");

var writeReportFromWBAPI = async (req, res, next) => {
  var { saveReportToDb } = req.app.locals.reportCollectionServices;
  var { getReportsTree, updateReportTree } = req.app.locals.reportsTreeCollectionServices;
  var { addNewTaxYearToDb, changePaidTaxAmountToDb } = req.app.locals.taxParamsCollectionServices;

  var { dateTo, dateFrom, mainReport, storageReport, totalAdvertisingCosts } = req.body;

  var userId = req.app.locals.userId;
  var reportId = mainReport[0].realizationreport_id;
  var reports = { mainReport, storageReport, totalAdvertisingCosts };

  var { years } = await getReportsTree(userId);

  var { years, year, month } = await insertReportToReportTree(dateFrom, dateTo, reportId, years);

  var sortedYears = await sortYearsTree(years);

  await updateReportTree(userId, sortedYears);

  var taxParams = await addNewTaxYearToDb(userId, year);

  var report = await parseReports(userId, taxParams, reports);

  taxParams.paidTaxAmount += report.totalTaxAmount;

  await changePaidTaxAmountToDb(userId, year, taxParams.paidTaxAmount);

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.recordTo = { year, month };

  var success = await saveReportToDb(userId, report);

  if (success) {
    var { totalTaxAmount } = report;

    return res.status(200).json({ reportId, year, month, dateFrom, dateTo, totalTaxAmount });
  }

  return res.sendStatus(500);
};

module.exports = writeReportFromWBAPI;
