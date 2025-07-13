import createReportsTable from "./createReportsTable.js";
import createMonthlyReportDownloadButton from "./createMonthlyReportDownloadButton.js";

var createMonthsDetails = async (months, year) => {
  var div = document.createElement("div");
  div.class = "details";
  div.id = `months_container_${year}`;

  for (var monthData of months) {
    var details = document.createElement("details");
    var summary = document.createElement("summary");

    if (monthData) {
      var { month, reportIds } = monthData;
      summary.append(month);

      details.id = `reports_container_${year}_${month}`;

      var reportsTable = await createReportsTable(year, month, reportIds);

      var downloadBtn = await createMonthlyReportDownloadButton(
        reportIds,
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
