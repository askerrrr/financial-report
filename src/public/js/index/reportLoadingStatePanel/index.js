import insertDataToTable from "./insertDataToTable.js";
import showReportLoadingStatePanel from "./showReportLoadingStatePanel.js";
import refreshReportLoadingStateStatus from "./refreshReportLoadingStateStatus.js";

var reportLoadingStatePanelBuilder = async (userId, url, { reportsQueue, abandonedReports, loadingInProgress, isReportLoadingDelayed }) => {
  if (loadingInProgress || isReportLoadingDelayed) {
    await showReportLoadingStatePanel();

    var reportsQueueTbodyId = "reports-queue-tbody";
    var abandonedReportsTbodyId = "abandoned-reports-tbody";

    insertDataToTable(reportsQueue, reportsQueueTbodyId);
    insertDataToTable(abandonedReports, abandonedReportsTbodyId);

    await refreshReportLoadingStateStatus(url);
  }
};

export default reportLoadingStatePanelBuilder;
