import createReportRow from "./createReportRow.js";
import createYearDetails from "./createYearDetails.js";
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

  var reportTbody = document.getElementById(reportTbodyId);

  if (!reportTbody) {
    var summary = document.createElement("summary");
    summary.append(month);

    var reportTable = await createReportRow(reportData, month);

    var details = document.createElement("details");
    details.id = `reports_container_${year}_${month}`;
    details.append(summary, reportTable);

    var div = document.createElement("div");
    div.class = "details";
    div.append(details);

    var year = document.getElementById(year);
    year.append(div);

    return;
  }

  return await createReportRow(reportData, month, reportTbody);
};

export default insertNewReportToTree;
