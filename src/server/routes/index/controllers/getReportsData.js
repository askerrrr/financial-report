var getReportTreeDto = require("../services/getReportTreeDto");
var getReportsDto = require("../services/getReportsDto");

var getReportsData = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { getReportsByUserId } = req.app.locals.reportCollectionServices;
  var { getReportTree } = req.app.locals.reportsTreeCollectionServices;

  var [{ reportTree }, reports] = await Promise.all([getReportTree(userId), getReportsByUserId(userId)]);

  var [reportTreeDto, reportsDto] = await Promise.all([getReportTreeDto(reportTree), getReportsDto(reports)]);

  return res.json({ reports: reportsDto, reportTree: reportTreeDto });
};

module.exports = getReportsData;
