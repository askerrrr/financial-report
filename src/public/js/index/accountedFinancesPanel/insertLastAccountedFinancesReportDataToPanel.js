import getReportPeriod from "./getReportPeriod.js";

var insertLastAccountedFinancesReportDataToPanel = (lastAccountedFinances) => {
  var { dateFrom, dateTo, reportId, financesAccountedAt } = lastAccountedFinances;

  var reportPeriodElem = document.getElementById("report-period");

  var { reportPeriod } = getReportPeriod(dateFrom, dateTo);
  reportPeriodElem.textContent += reportPeriod;

  var financesAccountedAtElem = document.getElementById("finances-accounted-at");

  financesAccountedAtElem.textContent += new Date(financesAccountedAt - 3 * 60 * 60 * 1000).toLocaleString();

  var linkToReportElem = document.getElementById("link-to-report");
  linkToReportElem.href = "/report/" + reportId;
};

export default insertLastAccountedFinancesReportDataToPanel;
