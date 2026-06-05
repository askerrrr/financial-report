import insertDataToTable from "./insertDataToTable.js";
import getReportLoadingState from "./getReportLoadingState.js";
import showReportLoadingStatePanel from "./showReportLoadingStatePanel.js";
import refreshReportLoadingStateStatus from "./refreshReportLoadingStateStatus.js";
import { enableParentReportLoadingStatePanel } from "./toggleVisibilityOfParentReportLoadingStatePanel.js";

var reportLoadingStatePanelBuilder = async (userId, reportLoadingState, isMainPageLoad) => {
  if (!isMainPageLoad) {
    reportLoadingState = await getReportLoadingState(userId);
  }

  var { reportsQueue, abandonedReports, loadingInProgress, isReportLoadingDelayed } = reportLoadingState;

  if (loadingInProgress || isReportLoadingDelayed) {
    enableParentReportLoadingStatePanel();
    await showReportLoadingStatePanel();

    var reportsQueueTbodyId = "reports-queue-tbody";
    var abandonedReportsTbodyId = "abandoned-reports-tbody";

    insertDataToTable(reportsQueue, reportsQueueTbodyId);
    insertDataToTable(abandonedReports, abandonedReportsTbodyId);

    await refreshReportLoadingStateStatus(userId);
  }
};

export default reportLoadingStatePanelBuilder;
