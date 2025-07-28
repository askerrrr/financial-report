var parseReports = require("../services/writeAndCalcReportDataFromWBAPI/index");
var organizeReportsByPeriod = require("../services/reportTreeBuilder");
var sortYearsTree = require("../services/different/sortYearTree");

var writeReportFromWBAPI = async (req, res, next) => {
  var { saveReportToDb } = req.app.locals.reportCollectionServices;
  var { getReportsTree, updateReportsPeriods } =
    req.app.locals.reportsTreeCollectionServices;
  var { getUserOptionsFromDb } = req.app.locals.optionsCollectionServices;

  var { dateTo, dateFrom, mainReport, storageReport, totalAdCampaignCosts } =
    req.reportData;

  var userId = req.app.locals.userId;

  var options = await getUserOptionsFromDb(userId);

  var reports = { mainReport, storageReport, totalAdCampaignCosts };

  var report = await parseReports(options, reports);

  var reportId = mainReport[0].realizationreport_id;

  var { years } = await getReportsTree(userId);

  var { years, year, month } = await organizeReportsByPeriod(
    dateFrom,
    dateTo,
    reportId,
    years
  );

  var sortedYears = await sortYearsTree(years);

  await updateReportsPeriods(userId, sortedYears);

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
