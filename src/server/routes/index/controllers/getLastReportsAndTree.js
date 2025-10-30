var getReportTreeDto = require("../services/getReportTreeDto");

var projectonFields = ["reports.reportId", "reports.totalTaxAmount", "reports.totalFinalProfit", "reports.totalProductCosts"];

var getLastReportsAndTree = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { getReportsByUserId } = req.app.locals.reportCollectionServices;
  var { getReportTree } = req.app.locals.reportsTreeCollectionServices;

  var { reportTree } = await getReportTree(userId);

  if (!reportTree.length) {
    return res.json({ lastReports: [], reportTree: [] });
  }

  var reportTreeDto = await getReportTreeDto(reportTree);

  var lastReportIds = reportTreeDto[0].months[0].reportIds.map((item) => item.reportId);

  if (!lastReportIds.length) {
    return res.json({ lastReports: [], reportTree: [] });
  }

  var { reports } = await getReportsByUserId(userId, projectonFields, lastReportIds);
  return res.json({ lastReports: reports, reportTree: reportTreeDto });
};

module.exports = getLastReportsAndTree;
