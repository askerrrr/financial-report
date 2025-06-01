var parseReport = require("../services/writeAndCalcReportDataFromWBAPI/parseReport");

var writeReportFromWBAPI = async (req, res, next) => {
  var { report, dateFrom, dateTo } = req.reportData;

  var userId = req.app.locals.userId;

  var parsedReport = await parseReport(report, dateFrom, dateTo);
};

module.exports = writeReportFromWBAPI;
