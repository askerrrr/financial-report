var parseReports = require("../services/writeAndCalcReportDataFromWBAPI/index");
var insertReportToReportTree = require("../services/reportTreeBuilder");
var sortYearsTree = require("../services/different/sortYearTree");

var writeReportFromWBAPI = async (req, res, next) => {
  var { saveReportToDb } = req.app.locals.reportCollectionServices;
  var { getReportsTree, updateReportTree } =
    req.app.locals.reportsTreeCollectionServices;
  var { getTaxParamsFromDb, changePaidTaxAmountToDb } =
    req.app.locals.taxParamsCollectionServices;

  var { dateTo, dateFrom, mainReport, storageReport, totalAdCampaignCosts } =
    req.reportData;

  var userId = req.app.locals.userId;

  var taxParams = await getTaxParamsFromDb(userId);

  var reports = { mainReport, storageReport, totalAdCampaignCosts };

  var report = await parseReports(taxParams, reports);

  var reportId = mainReport[0].realizationreport_id;

  var { years } = await getReportsTree(userId);

  var { years, year, month } = await insertReportToReportTree(
    dateFrom,
    dateTo,
    reportId,
    years
  );

  var sortedYears = await sortYearsTree(years);

  await updateReportTree(userId, sortedYears);

  var { paidTaxAmount } = taxParams;
  paidTaxAmount += report.totalTaxAmount;

  await changePaidTaxAmountToDb(userId, paidTaxAmount);

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.recordTo = { year, month };

  var successfullWrite = await saveReportToDb(userId, report);

  if (successfullWrite) {
    var { totalTaxAmount } = report;

    return res
      .status(200)
      .json({ reportId, year, month, dateFrom, dateTo, totalTaxAmount });
  }

  return res.sendStatus(500);
};

module.exports = writeReportFromWBAPI;
