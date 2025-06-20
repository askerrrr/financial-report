import getReportLink from "../row/services/getReportLink.js";
import getReportPeriod from "../row/services/getReportPeriod.js";
import createTdElement from "../../report/row/services/createTdElement.js";

var insertReportDataToTop = async (report) => {
  var { dateFrom, dateTo, reportId, totalTaxAmount } = report;

  var reportPeriod = await getReportPeriod(dateFrom, dateTo);

  var reportLink = await getReportLink(reportId);

  var totalProductCostsTd = await createTdElement(
    0,
    null,
    null,
    "totalProductCosts"
  );

  var totalTaxAmountTd = await createTdElement(
    totalTaxAmount,
    null,
    null,
    "totalTaxAmount"
  );

  var totalFinalNetProfitTd = await createTdElement(
    0,
    null,
    null,
    "totalFinalNetProfit"
  );

  var tr = document.createElement("tr");

  tr.append(
    reportPeriod,
    totalFinalNetProfitTd,
    totalProductCostsTd,
    totalTaxAmountTd,
    reportLink
  );

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
