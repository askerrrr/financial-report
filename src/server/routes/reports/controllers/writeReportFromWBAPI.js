var parseReport = require("../services/writeAndCalcReportDataFromWBAPI/parseReport");

var writeReportFromWBAPI = async (req, res, next) => {
  var { createReport } = req.app.locals.reportCollectionServices();

  var { report, dateFrom, dateTo } = req.reportData;

  var userId = req.app.locals.userId;

  var parsedReport = await parseReport(report, dateFrom, dateTo);

  var successfullWrite = await createReport(userId, parsedReport);

  if (successfullWrite) {
    var { reportId } = parsedReport;

    return res.status(200).json({ reportId, dateFrom, dateTo });
  }

  return res.sendStatus(500);
};

module.exports = writeReportFromWBAPI;
