import createYearDetails from "./createYearDetails.js";
import createReportsTable from "./createReportsTable.js";
import createReportRow from "./createReportRow.js";
import removeNoReportsMessage from "./removeNoReportsMessage.js";

var insertNewReportToTree = async (reportData) => {
  removeNoReportsMessage();

  var { year, month } = reportData;

  var yearDetailsId = year;

  var yearDetails = document.getElementById(yearDetailsId);

  if (!yearDetails) {
    var yearDetails = await createYearDetails(reportData, month);

    var yearsContainer = document.getElementById("years_container");
    yearsContainer.prepend(yearDetails);

    return;
  }

  var reportTbodyId = `tbody_year_${year}_month_${month}`;
  var monthReportsContainerId = `reports_container_${year}_${month}`;

  var monthReportsContainer = document.getElementById(monthReportsContainerId);

  if (!monthReportsContainer) {
    var summaryToMonthReportsContainer = document.createElement("summary");
    summaryToMonthReportsContainer.append(month);

    monthReportsContainer = document.createElement("details");
    monthReportsContainer.id = monthReportsContainerId;

    var monthsContainerId = `months_container_${year}`;
    var monthsContainer = document.getElementById(monthsContainerId);
    monthsContainer.append(monthReportsContainer);

    var reportRow = await createReportRow(reportData);
    var reportsTable = await createReportsTable(reportData, reportRow, month);
    monthReportsContainer.append(summaryToMonthReportsContainer, reportsTable);

    monthReportsContainer.open = true;
  } else {
    monthReportsContainer.addEventListener("click", async () => {
      var reportRow = await createReportRow(reportData);

      await delayForCreatingTableBody();

      var reportTbody = document.getElementById(reportTbodyId);

      reportTbody.append(reportRow);
    });

    monthReportsContainer.click();
    monthReportsContainer.open = true;
  }
};

export default insertNewReportToTree;

async function delayForCreatingTableBody() {
  return new Promise((res) => setTimeout(res, 20));
}
