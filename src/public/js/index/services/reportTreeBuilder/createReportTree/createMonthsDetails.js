import createReportsTable from "./createReportsTable.js";
import createMonthlyReportDownloadButton from "./createMonthlyReportDownloadButton.js";

var createMonthsDetails = async (months, year) => {
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
        console.log("details open");
        //var {reports} = await getReports(userId, reportIds)
        // var reportsTable = await createReportsTable(year, month, reportIds, reports);

        // var downloadBtn = await createMonthlyReportDownloadButton(reportIds, year, month);

        // details.append(reportsTable, downloadBtn);
      }
    });

    div.append(details);
  }

  return div;
};

export default createMonthsDetails;
