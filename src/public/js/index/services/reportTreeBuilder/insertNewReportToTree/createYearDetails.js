import createReportRow from "./createReportRow.js";
import createReportsTable from "./createReportsTable.js";

var createMonthDetails = async (reportData, monthName) => {
  var { year } = reportData;

  var summaryToMonthReportsContainer = document.createElement("summary");
  summaryToMonthReportsContainer.append(monthName);

  var reportRow = await createReportRow(reportData);
  var reportsTable = await createReportsTable(reportRow);

  var monthReportsContainerId = `reports_container_${year}_${monthName}`;
  var monthReportsContainer = document.getElementById(monthReportsContainerId);

  if (!monthReportsContainer) {
    monthReportsContainer = document.createElement("details");
    monthReportsContainer.id = `reports_container_${year}_${monthName}`;
  }

  monthReportsContainer.append(summaryToMonthReportsContainer, reportsTable);
  return monthReportsContainer;
};

var createYearDetails = async (reportData, monthName) => {
  var { year } = reportData;

  var summary = document.createElement("summary");
  summary.append(year);

  var monthDetails = await createMonthDetails(reportData, monthName);

  var monthsContainerId = `months_container_${year}`;
  var monthsContainer = document.getElementById(monthsContainerId);

  if (!monthsContainer) {
    monthsContainer = document.createElement("div");
    monthsContainer.id = monthsContainerId;
  }

  monthsContainer.append(monthDetails);

  var details = document.createElement("details");
  details.id = year;
  details.append(summary, monthsContainer);

  return details;
};

export default createYearDetails;
