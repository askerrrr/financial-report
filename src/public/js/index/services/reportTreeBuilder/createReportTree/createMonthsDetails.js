import createReportsTable from "./createReportsTable.js";
import createMonthlyReportDownloadButton from "./createMonthlyReportDownloadButton.js";

var userId = document.cookie.split("=")[1];

var getRequiredReports = async (reportIds) => {
  var url = "/api/required-reports/";

  var res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, reportIds: reportIds.map((item) => item.reportId) }),
  });

  var { reports } = await res.json();

  return { reports };
};

var createDetailsToReportsContainer = (year, month, reportIds) => {
  var summary = document.createElement("summary");
  summary.append(month);

  var details = document.createElement("details");
  details.id = `reports_container_${year}_${month}`;
  details.append(summary);

  details.addEventListener("click", async () => {
    if (!details.open) {
      if (!document.getElementById(`tbody_year_${year}_month_${month}`)) {
        var { reports } = await getRequiredReports(reportIds);

        var [reportsTable, downloadBtn] = await Promise.all([
          createReportsTable(year, month, reportIds, reports),
          createMonthlyReportDownloadButton(reportIds, year, month),
        ]);

        details.append(reportsTable, downloadBtn);
        details.open = true;
      }
    }
  });

  return details;
};

var createMonthsDetails = async (months, year) => {
  var monthsContainer = document.createElement("div");
  monthsContainer.class = "details";
  monthsContainer.id = `months_container_${year}`;

  for (var { month, reportIds } of months) {
    var reportsContainer = createDetailsToReportsContainer(year, month, reportIds);
    monthsContainer.append(reportsContainer);
  }

  return monthsContainer;
};

export default createMonthsDetails;
