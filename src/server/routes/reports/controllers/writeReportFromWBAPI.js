var parseReport = require("../services/writeAndCalcReportDataFromWBAPI/index");
var organizeReportsByPeriod = require("../services/reportTreeBuilder");
var sortYearsTree = require("../services/different/sortYearTree");

var writeReportFromWBAPI = async (req, res, next) => {
  var { saveReportToDb } = req.app.locals.reportCollectionServices;
  var { getReportingPeriods, updateReportsPeriods } =
    req.app.locals.reportsTreeCollectionServices;

  var { dateTo, dateFrom, report, paidStorageReport, totalAdCampaignCosts } =
    req.reportData;

  var userId = req.app.locals.userId;

  var parsedReport = await parseReport(
    dateTo,
    dateFrom,
    report,
    paidStorageReport,
    totalAdCampaignCosts
  );

  var reportId = report[0].realizationreport_id;

  var { years } = await getReportingPeriods(userId);

  var { years, year, month } = await organizeReportsByPeriod(
    dateFrom,
    dateTo,
    reportId,
    years
  );

  var sortedYears = await sortYearsTree(years);

  await updateReportsPeriods(userId, sortedYears);

  parsedReport.userId = userId;
  parsedReport.reportId = reportId;
  parsedReport.recordTo = { year, month };

  var successfullWrite = await saveReportToDb(userId, parsedReport);

  if (successfullWrite) {
    var { totalTaxAmount } = parsedReport;

    return res
      .status(200)
      .json({ reportId, year, month, dateFrom, dateTo, totalTaxAmount });
  }

  return res.sendStatus(500);
};

module.exports = writeReportFromWBAPI;
