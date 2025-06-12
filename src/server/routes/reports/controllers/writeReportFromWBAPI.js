var parseReport = require("../services/writeAndCalcReportDataFromWBAPI/parseReport");

var writeReportFromWBAPI = async (req, res, next) => {
  var { createReport } = req.app.locals.reportCollectionServices();

  var { report, paidStorageReport, dateFrom, dateTo } = req.reportData;

  var userId = req.app.locals.userId;

  var parsedReport = await parseReport(
    report,
    paidStorageReport,
    dateFrom,
    dateTo
  );

  var reportId = report[0].realizationreport_id;

  parsedReport.reportId = reportId;

  var successfullWrite = await createReport(userId, parsedReport);

  if (successfullWrite) {
    var { totalFinalNetProfit } = parsedReport;

    return res
      .status(200)
      .json({ reportId, dateFrom, dateTo, totalFinalNetProfit });
  }

  return res.sendStatus(500);
};

module.exports = writeReportFromWBAPI;
