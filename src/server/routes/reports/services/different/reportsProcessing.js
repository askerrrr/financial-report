var wbapi = require("../WBAPI");
var sortYearsTree = require("./sortYearTree");
var parseReports = require("../reportParsing");
var dbutils = require("../../../../database/collections");
var addNewSkusToListGoods = require("./addNewSkusToListGoods");
var insertReportToReportTree = require("../reportTreeBuilder");
var recalculatePaidTaxAmount = require("./recalculatePaidTaxAmount");
var schemaVersioning = require("../../../../database/migration/schemaVersioning/reportsCollection");

var reportsProcessing = async (userId, dateFrom, dateTo, session) => {
  var { saveReportToDb } = dbutils.reportCollectionServices;
  var { getWBTokenByUserId } = dbutils.tokenCollectionServices;
  var { getListGoodsFromDb, saveListGoodsToDb } = dbutils.goodsCollectionServices;
  var { getReportTree, updateReportTree } = dbutils.reportsTreeCollectionServices;
  var { addNewTaxYearToDb, changeTaxParamsToDb } = dbutils.taxParamsCollectionServices;

  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearReport = startYear !== endYear;

  var token = await getWBTokenByUserId(userId);
  var { reportTree } = await getReportTree(userId);
  var reports = await wbapi.getReports(userId, dateFrom, dateTo, token);
  var reportId = reports.weeklyFinancialReport[0].realizationreport_id;

  var { years, year, month } = await insertReportToReportTree(dateFrom, dateTo, reportId, reportTree);
  var sortedYears = sortYearsTree(years);

  if (isCrossYearReport) {
    var startYearTaxParams = await addNewTaxYearToDb(userId, startYear, session);
    var endYearTaxParams = await addNewTaxYearToDb(userId, endYear, session);
    var taxParams = { startYearTaxParams, endYearTaxParams };

    var { report, skuNamesAndIds } = await parseReports(reports, taxParams, isCrossYearReport);

    var recalculatedStartYearTaxParams = recalculatePaidTaxAmount(report, startYearTaxParams, "InCurrentYear");
    var recalculatedEndYearTaxParams = recalculatePaidTaxAmount(report, endYearTaxParams, "InNextYear");

    await changeTaxParamsToDb(userId, startYear, session, recalculatedStartYearTaxParams);
    await changeTaxParamsToDb(userId, endYear, session, recalculatedEndYearTaxParams);
  } else {
    var taxParams = await addNewTaxYearToDb(userId, year, session);
    var { report, skuNamesAndIds } = await parseReports(reports, taxParams);

    var recalculatedTaxParams = recalculatePaidTaxAmount(report, taxParams);
    await changeTaxParamsToDb(userId, year, session, recalculatedTaxParams);
  }

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.crossesTaxYears = isCrossYearReport;
  report.schemaVersion = schemaVersioning.reportSchemaVersion;
  report.recordTo = { year, month, schemaVersion: schemaVersioning.recordToSchemaVersion };

  var { listGoods } = await getListGoodsFromDb(userId);
  var { updatedListGoods } = await addNewSkusToListGoods(listGoods, skuNamesAndIds);

  await saveReportToDb(userId, report, session);
  await updateReportTree(userId, sortedYears, session);
  await saveListGoodsToDb(userId, updatedListGoods, session);

  return { reportId, year, month, dateFrom, dateTo, totalTaxAmount: report.totalTaxAmount };
};

module.exports = reportsProcessing;
