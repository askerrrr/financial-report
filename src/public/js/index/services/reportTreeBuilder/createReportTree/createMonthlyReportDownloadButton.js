import getCookieByName from "../../getCookieByName.js";

var createMonthlyReportDownloadButton = async (reportIds) => {
  var button = document.createElement("button");

  var reportIds = reportIds.map((e) => e.reportId);

  button.id = reportIds;

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var userId = await getCookieByName("userId");

    var url = "/reports/download-reports-as-xlsx/";

    var res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ userId, reportIds }),
      headers: { "Content-Type": "application/json" },
    });
  });

  return button;
};

export default createMonthlyReportDownloadButton;
