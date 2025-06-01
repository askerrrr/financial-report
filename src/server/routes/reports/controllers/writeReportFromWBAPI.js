var parseReport = require("../services/writeAndCalcReportDataFromWBAPI/parseReport");

var writeReportFromWBAPI = async (req, res, next) => {
  var report = req.report;

  var parsedReport = await parseReport(report);
};

module.exports = writeReportFromWBAPI;
