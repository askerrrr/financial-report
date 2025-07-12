var createMonthlyReportDownloadButton = async (reportIds) => {
  var button = document.createElement("button");

  var reportIdsStr = reportIds.map((e) => e.reportId);

  button.id = reportIdsStr;

  button.addEventListener("click", async (e) => {
    e.preventDefault();
  });

  return button;
};

export default createMonthlyReportDownloadButton;
