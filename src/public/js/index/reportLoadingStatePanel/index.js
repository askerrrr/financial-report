import insertDataToTable from "./insertDataToTable.js";
import showReportLoadingStatePanel from "./showReportLoadingStatePanel.js";
import refreshReportLoadingStateStatus from "./refreshReportLoadingStateStatus.js";
import { enableParentReportLoadingStatePanel } from "./toggleVisibilityOfParentReportLoadingStatePanel.js";

var reportLoadingStatePanelBuilder = async (userId, url, { reportsQueue, abandonedReports, loadingInProgress, isReportLoadingDelayed }) => {
  if (loadingInProgress || isReportLoadingDelayed) {
    enableParentReportLoadingStatePanel();
    await showReportLoadingStatePanel();

    var reportsQueueTbodyId = "reports-queue-tbody";
    var abandonedReportsTbodyId = "abandoned-reports-tbody";

    insertDataToTable(reportsQueue, reportsQueueTbodyId);
    insertDataToTable(abandonedReports, abandonedReportsTbodyId);

    await refreshReportLoadingStateStatus(userId, url);
  }
};

export default reportLoadingStatePanelBuilder;
