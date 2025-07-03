import createReportRow from "./createReportRow.js";
import createYearDetails from "./createYearDetails.js";
import getMonthNameByNum from "./getMonthNameByNum.js";

var insertReportToYearMonthTree = async (reportData) => {
  var { year, month } = reportData;

  var yearDetailsId = year;

  var yearDetails = document.getElementById(yearDetailsId);

  var monthName = await getMonthNameByNum(month);

  if (!yearDetails) {
    var yearDetails = await createYearDetails(reportData, monthName);

    var yearsContainer = document.getElementById("years_container");
    yearsContainer.prepend(yearDetails);

    return;
  }

  var reportTbodyId = `tbody_year_${year}_month_${monthName}`;

  var reportTbody = document.getElementById(reportTbodyId);

  if (!reportTbody) {
    var summary = document.createElement("summary");
    summary.append(monthName);

    var reportTable = await createReportRow(reportData, monthName);

    var details = document.createElement("details");
    details.id = `reports_container_${year}_${monthName}`;
    details.append(summary, reportTable);

    var div = document.createElement("div");
    div.class = "details";
    div.append(details);

    var year = document.getElementById(year);
    year.append(div);

    return;
  }

  return await createReportRow(reportData, monthName, reportTbody);
};

export default insertReportToYearMonthTree;
