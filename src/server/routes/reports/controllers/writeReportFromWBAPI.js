var sortYearsTree = require("../services/different/sortYearTree");
var insertReportToReportTree = require("../services/reportTreeBuilder");
var parseReports = require("../services/writeAndCalcReportDataFromWBAPI/index");
var { reportSchemaVersion, recordToSchemaVersion } = require("../../../database/migration/schemaVersioning/reportsCollection");

var writeReportFromWBAPI = async (req, res, next) => {
  var { saveReportToDb } = req.app.locals.reportCollectionServices;
  var { getReportTree, updateReportTree } = req.app.locals.reportsTreeCollectionServices;
  var { addNewTaxYearToDb, changePaidTaxAmountToDb } = req.app.locals.taxParamsCollectionServices;

  var { dateTo, dateFrom, reports, userId } = req.body;

  var reportId = reports.mainReport[0].realizationreport_id;

  var { reportTree } = await getReportTree(userId);
  var { years, year, month } = await insertReportToReportTree(dateFrom, dateTo, reportId, reportTree);
  var sortedYears = sortYearsTree(years);
  await updateReportTree(userId, sortedYears);

  var { taxRate, paidTaxAmount } = await addNewTaxYearToDb(userId, +year);
  var { report, skuNamesAndIds } = await parseReports(taxRate, reports);
  paidTaxAmount += report.totalTaxAmount;
  await changePaidTaxAmountToDb(userId, year, paidTaxAmount);

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.schemaVersion = reportSchemaVersion;
  report.recordTo = { year, month, schemaVersion: recordToSchemaVersion };

  var success = await saveReportToDb(userId, report);

  if (success) {
    var { totalTaxAmount } = report;

    return res.status(200).json({ reportId, year, month, dateFrom, dateTo, totalTaxAmount });
  }

  return res.sendStatus(500);
};

module.exports = writeReportFromWBAPI;
