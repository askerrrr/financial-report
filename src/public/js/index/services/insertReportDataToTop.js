import getReportLink from "../row/services/getReportLink.js";
import getReportPeriod from "../row/services/getReportPeriod.js";

var insertReportDataToTop = async ({ dateFrom, dateTo, reportId }) => {
  var reportPeriod = await getReportPeriod(dateFrom, dateTo);

  var reportLink = await getReportLink(reportId);

  var tr = document.createElement("tr");

  tr.append(reportPeriod, reportLink);

  var tbody = document.getElementById("tbody");

  if (tbody) {
    tbody.prepend(tr);

    return tbody;
  }

  var tbody = document.createElement("tbody");

  tbody.append(tr);

  return tbody;
};

export default insertReportDataToTop;
