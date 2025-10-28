import createReportsTable from "./createReportsTable.js";
import createMonthlyReportDownloadButton from "./createMonthlyReportDownloadButton.js";

var userId = document.cookie.split("=")[1];

var getRequiredReports = async (reportIds) => {
  var url = "/api/required-reports/";

  var res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ userId, reportIds: reportIds.map((item) => item.reportId) }),
    headers: { "Content-Type": "application/json" },
  });

  var { reports } = await res.json();

  return { reports };
};

var createMonthsDetails = async (months, year) => {
  try {
    var div = document.createElement("div");
    div.class = "details";
    div.id = `months_container_${year}`;

    for (var { month, reportIds } of months) {
      var details = document.createElement("details");
      var summary = document.createElement("summary");

      summary.append(month);
      details.append(summary);
      details.id = `reports_container_${year}_${month}`;

      details.addEventListener("click", async () => {
        if (details.open) {

          var { reports } = await getRequiredReports(reportIds);
          var reportsTable = await createReportsTable(year, month, reportIds, reports);

          var downloadBtn = await createMonthlyReportDownloadButton(reportIds, year, month);

          details.append(reportsTable, downloadBtn);
        }
      });

      div.append(details);
    }

    return div;
  } catch (e) {
    console.log({ e });
  }
};

export default createMonthsDetails;
