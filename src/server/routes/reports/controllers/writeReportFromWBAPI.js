var parseReport = require("../services/writeAndCalcReportDataFromWBAPI/index");
var organizeReportsByPeriod = require("../services/reportPeriodsStructure");

var writeReportFromWBAPI = async (req, res, next) => {
  var { createReport } = req.app.locals.reportCollectionServices;

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

  var successfullWrite = await createReport(userId, parsedReport);

  if (successfullWrite) {
    var { totalTaxAmount } = parsedReport;

    return res.status(200).json({ reportId, dateFrom, dateTo, totalTaxAmount });
  }

  return res.sendStatus(500);
};

module.exports = writeReportFromWBAPI;
