import getReportLink from "../row/services/getReportLink.js";
import getReportPeriod from "../row/services/getReportPeriod.js";
import createTdElement from "../../report/row/services/createTdElement.js";

var insertReportDataToTop = async ({ dateFrom, dateTo, reportId }) => {
  var reportPeriod = await getReportPeriod(dateFrom, dateTo);

  var reportLink = await getReportLink(reportId);

  var totalFinalNetProfitTd = await createTdElement(
    0,
    null,
    null,
    "totalFinalNetProfit"
  );

  var tr = document.createElement("tr");

  tr.append(reportPeriod, totalFinalNetProfitTd, reportLink);

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
