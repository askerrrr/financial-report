var getReportTreeDto = require("../services/getReportTreeDto");

var treeIsEmpty = (tree) => !tree.length && tree.every((i) => !i.months.length);
var getLastNonEmptyReportIds = (lastYear) => lastYear.months.find((item) => item?.reportIds.length).reportIds.map(({ reportId }) => reportId);

var projectonFields = ["reports.reportId", "reports.totalTaxAmount", "reports.totalFinalProfit", "reports.totalProductCosts"];

var getLastReportsAndTree = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { getReportsByUserId } = req.app.locals.reportCollectionServices;
  var { getReportTree } = req.app.locals.reportsTreeCollectionServices;

  var { reportTree } = await getReportTree(userId);

  if (!treeIsEmpty(reportTree)) {
    return res.json({ lastReports: [], reportTree: [] });
  }

  var reportTreeDto = await getReportTreeDto(reportTree);
  console.log({ reportTreeDto, lastReportIds });
  var lastYear = reportTreeDto[0];
  var lastReportIds = getLastNonEmptyReportIds(lastYear);

  if (!lastReportIds.length) {
    return res.json({ lastReports: [], reportTree: [] });
  }

  var { reports } = await getReportsByUserId(userId, projectonFields, lastReportIds);
  return res.json({ lastReports: reports, reportTree: reportTreeDto });
};

module.exports = getLastReportsAndTree;
