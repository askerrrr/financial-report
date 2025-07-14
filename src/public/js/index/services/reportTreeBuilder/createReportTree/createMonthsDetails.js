import createReportsTable from "./createReportsTable.js";
import createMonthlyReportDownloadButton from "./createMonthlyReportDownloadButton.js";

var createMonthsDetails = async (months, year, reports) => {
  var div = document.createElement("div");
  div.class = "details";
  div.id = `months_container_${year}`;

  for (var monthData of months) {
    var details = document.createElement("details");
    var summary = document.createElement("summary");

    if (monthData) {
      var { month, reportIds } = monthData;
      summary.append(month);

      var validReportIds = reportIds.filter((reportId) => reportId);

      details.id = `reports_container_${year}_${month}`;

      var reportsTable = await createReportsTable(
        year,
        month,
        validReportIds,
        reports
      );

      var downloadBtn = await createMonthlyReportDownloadButton(
        validReportIds,
        year,
        month
      );

      details.append(summary, reportsTable, downloadBtn);

      div.append(details);
    }
  }

  return div;
};

export default createMonthsDetails;
