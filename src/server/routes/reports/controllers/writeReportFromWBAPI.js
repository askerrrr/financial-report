var parseReport = require("../services/writeAndCalcReportDataFromWBAPI/index");
var organizeReportsByPeriod = require("../services/reportTreeBuilder");

var writeReportFromWBAPI = async (req, res, next) => {
  var { saveReportToDb } = req.app.locals.reportCollectionServices;
  var { getReportingPeriods, updateReportsPeriods } =
    req.app.locals.reportingPeriodsCollectionServices;

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

  parsedReport.reportId = reportId;

  var { years } = await getReportingPeriods(userId);

  var { years, year, month } = await organizeReportsByPeriod(
    dateFrom,
    dateTo,
    reportId,
    years
  );

  await updateReportsPeriods(userId, years);

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
