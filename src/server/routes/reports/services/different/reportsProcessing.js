var wbapi = require("../WBAPI");
var calc = require("../calcServices");
var sortYearsTree = require("./sortYearTree");
var parseReports = require("../reportParsing");
var dbutils = require("../../../../database/collections");
var addNewSkusToListGoods = require("./addNewSkusToListGoods");
var splitReportSkusByYear = require("./splitReportSkusByYear");
var insertReportToReportTree = require("../reportTreeBuilder");
var schemaVersioning = require("../../../../database/migration/schemaVersioning/reportsCollection");
var parseReportsV1 = require("../reportParsing/indexV1");

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
  console.log({ isCrossYearReport });

  if (isCrossYearReport) {
    var startYearTaxParams = await addNewTaxYearToDb(userId, startYear, session);
    var endYearTaxParams = await addNewTaxYearToDb(userId, endYear, session);
    var taxParams = { startYearTaxParams, endYearTaxParams };

    var { report, skuNamesAndIds } = await parseReportsV1(reports, taxParams, isCrossYearReport);

    // var { report, skuNamesAndIds } = await parseReports((taxRate = null), reports, isCrossYearReport, startYear, endYear);

    var { startYearSkus, endYearSkus } = splitReportSkusByYear(reports.weeklyFinancialReport);

    // report.currentYearRetailAmount = calc.sum(startYearSkus, "retail_amount");
    // report.currentYearTaxAmount = calc.taxAmount(report.currentYearRetailAmount, startYearTaxParams.taxRate);
    // startYearTaxParams.paidTaxAmount += report.currentYearTaxAmount;

    // report.nextYearRetailAmount = calc.sum(endYearSkus, "retail_amount");
    // report.nextYearTaxAmount = calc.taxAmount(report.nextYearRetailAmount, endYearTaxParams.taxRate);
    // endYearTaxParams.paidTaxAmount += report.nextYearTaxAmount;

    // report.totalTaxAmount = report.currentYearTaxAmount + report.nextYearTaxAmount;

    // await changeTaxParamsToDb(userId, startYear, session, { paidTaxAmount: report.totalTaxAmountInCurrentYear });
    // await changeTaxParamsToDb(userId, endYear, session, { paidTaxAmount: report.totalTaxAmountInNextYear });
  } else {
    var { taxRate, paidTaxAmount } = await addNewTaxYearToDb(userId, year, session);
    //var { report, skuNamesAndIds } = await parseReports(taxRate, reports, isCrossYearReport);
    var { report, skuNamesAndIds } = await parseReportsV1(reports, { taxRate });
    paidTaxAmount += report.totalTaxAmount;
    await changeTaxParamsToDb(userId, year, session, { paidTaxAmount });
  }
  console.log(report);
  return;
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
