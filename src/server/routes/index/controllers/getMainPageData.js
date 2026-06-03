import dbUtils from "../../../database/collections/index.js";
import getReportTreeDto from "../services/getReportTreeDto.js";

var getLastNonEmptyReportIds = (lastYear) => lastYear?.months.find((item) => item?.reportIds.length)?.reportIds.map(({ reportId }) => reportId);

var projectonFields = [
  "reports.reportId",
  "reports.totalTaxAmount",
  "reports.totalFinalProfit",
  "reports.totalProductCosts",
  "reports.isFinancesAccounted",
];

var getMainPageData = async (req, res, next) => {
  var userId = req.app.locals.userId;

  var { getReportsByUserId } = dbUtils.reportCollectionServices;
  var { getReportTree } = dbUtils.reportsTreeCollectionServices;
  var { getReportLoadingState } = dbUtils.reportLoadingStatesCollectionServices;

  var { reportsQueue, abandonedReports, loadingInProgress, isReportLoadingDelayed } = await getReportLoadingState(userId);

  var { reportTree } = await getReportTree(userId);

  if (!reportTree.length) {
    return res.json({ lastReports: [], reportTree: [] });
  }

  var reportTreeDto = await getReportTreeDto(reportTree);

  var lastYear = reportTreeDto[0];
  var lastReportIds = getLastNonEmptyReportIds(lastYear);

  if (!lastReportIds || !lastReportIds.length) {
    return res.json({ lastReports: [], reportTree: [] });
  }

  var { reports } = await getReportsByUserId(userId, null, projectonFields, lastReportIds);

  return res.json({
    lastReports: reports,
    reportTree: reportTreeDto,
    reportLoadingStateUrl: "/report/loading-state/" + userId + "/",
    reportLoadingState: { reportsQueue, abandonedReports, loadingInProgress, isReportLoadingDelayed },
  });
};

export default getMainPageData;
