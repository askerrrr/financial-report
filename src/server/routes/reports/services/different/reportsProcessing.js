var wbapi = require("../WBAPI");
var sortYearsTree = require("./sortYearTree");
var parseReports = require("../reportParsing");
var dbutils = require("../../../../database/collections");
var addNewSkusToListGoods = require("./addNewSkusToListGoods");
var splitReportSkusByYear = require("./splitReportSkusByYear");
var insertReportToReportTree = require("../reportTreeBuilder");
var schemaVersioning = require("../../../../database/migration/schemaVersioning/reportsCollection");
const calc = require("../calcServices");

var reportsProcessing = async (userId, dateFrom, dateTo, isCrossYearReport, session) => {
  var { saveReportToDb } = dbutils.reportCollectionServices;
  var { getWBTokenByUserId } = dbutils.tokenCollectionServices;
  var { getListGoodsFromDb, saveListGoodsToDb } = dbutils.goodsCollectionServices;
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

  var { listGoods } = await getListGoodsFromDb(userId);
  var { updatedListGoods } = await addNewSkusToListGoods(listGoods, skuNamesAndIds);

  paidTaxAmount += report.totalTaxAmount;

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.crossesTaxYears = isCrossYearReport;
  report.schemaVersion = schemaVersioning.reportSchemaVersion;
  report.recordTo = { year, month, schemaVersion: schemaVersioning.recordToSchemaVersion };

  if (isCrossYearReport) {
    var { startYearSkus, endYearSkus } = splitReportSkusByYear(reports.weeklyFinancialReport);
    var startYearSkusRetailAmount = calc.total.retailAmount(startYearSkus);
    var endYearSkusRetailAmount = calc.total.retailAmount(endYearSkus);
    
  }

  await saveReportToDb(userId, report, session);
  await updateReportTree(userId, sortedYears, session);
  await saveListGoodsToDb(userId, updatedListGoods, session);
  await changeTaxParamsToDb(userId, year, session, { paidTaxAmount });

  return { reportId, year, month, dateFrom, dateTo, totalTaxAmount: report.totalTaxAmount };
};

module.exports = reportsProcessing;
