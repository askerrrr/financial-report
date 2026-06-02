import showReportLoadingStatePanel from "./showReportLoadingStatePanel.js";

var reportLoadingStatePanelBuilder = async (userId, { reportsQueue, abandonedReports, loadingInProgress, isReportLoadingDelayed }) => {
  if (loadingInProgress || isReportLoadingDelayed) {
    await showReportLoadingStatePanel();
  }
};

export default reportLoadingStatePanelBuilder;
