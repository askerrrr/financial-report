var reportLoadingStatePanel = document.getElementById("report-loading-state-panel");

var enableReportLoadingStatePanel = () => (reportLoadingStatePanel.hidden = false);
var disableReportLoadingStatePanel = () => (reportLoadingStatePanel.hidden = true);

export { enableReportLoadingStatePanel, disableReportLoadingStatePanel };
