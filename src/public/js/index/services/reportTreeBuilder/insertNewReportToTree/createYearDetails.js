import createReportRow from "./createReportRow.js";

var createMonthDetails = async (reportData, monthName) => {
  var { year } = reportData;

  var summary = document.createElement("summary");
  summary.append(monthName);

  var reportRow = await createReportRow(reportData, monthName);

  var details = document.createElement("details");
  details.id = `reports_container_${year}_${monthName}`;
  details.append(summary, reportRow);

  var div = document.createElement("div");
  div.class = "details";
  div.append(details);

  return div;
};

var createYearDetails = async (reportData, monthName) => {
  var { year } = reportData;

  var summary = document.createElement("summary");
  summary.append(year);

  var monthDetails = await createMonthDetails(reportData, monthName);

  var details = document.createElement("details");
  details.id = year;
  details.append(summary, monthDetails);

  return details;
};

export default createYearDetails;
