var wbapi = require("../WBAPI");
var sortYearsTree = require("./sortYearTree");
var dbutils = require("../../../../database/collections");
var insertReportToReportTree = require("../reportTreeBuilder");
var parseReports = require("../writeAndCalcReportDataFromWBAPI");
var schemaVersioning = require("../../../../database/migration/schemaVersioning/reportsCollection");

var reportsProcessing = async (userId, dateFrom, dateTo, session) => {
  var { saveReportToDb } = dbutils.reportCollectionServices;
  var { getWBTokenByUserId } = dbutils.tokenCollectionServices;
  var { getReportTree, updateReportTree } = dbutils.reportsTreeCollectionServices;
  var { addNewTaxYearToDb, changeTaxParamsToDb } = dbutils.taxParamsCollectionServices;

  var token = await getWBTokenByUserId(userId);
  var { reportTree } = await getReportTree(userId);
  var reports = await wbapi.getReports(userId, dateFrom, dateTo, token);
  var reportId = reports.weeklyFinancialReport[0].realizationreport_id;

  var { years, year, month } = await insertReportToReportTree(dateFrom, dateTo, reportId, reportTree);

  var sortedYears = sortYearsTree(years);

  var { taxRate, paidTaxAmount } = await addNewTaxYearToDb(userId, year, session);
  var { report, skuNamesAndIds } = await parseReports(taxRate, reports);
  paidTaxAmount += report.totalTaxAmount;

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.schemaVersion = schemaVersioning.reportSchemaVersion;
  report.recordTo = { year, month, schemaVersion: schemaVersioning.recordToSchemaVersion };

  await saveReportToDb(userId, report, session);
  await updateReportTree(userId, sortedYears, session);
  await changeTaxParamsToDb(userId, year, session, { paidTaxAmount });

  return { reportId, year, month, dateFrom, dateTo, totalTaxAmount: report.totalTaxAmount };
};

module.exports = reportsProcessing;
