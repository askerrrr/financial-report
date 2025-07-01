import getReportLink from "../row/services/getReportLink.js";
import getReportPeriod from "../row/services/getReportPeriod.js";
import createTdElement from "../../report/row/services/createTdElement.js";

var createMonthDetails = async (month, reportId) => {
  var summary = document.createElement("summary");
  summary.append(month);

  var details = document.createElement("details");
  details.append(summary);

  div.append(details);

  var div = document.createElement("div");

  return div;
};

var createYearDetails = async (year, month, reportId) => {
  var summary = document.createElement("summary");
  summary.append(year);

  var details = document.createElement("details");
  details.id = year;

  var monthDetails = await createMonthDetails(month, reportId);

  details.append(summary, monthDetails);

  document.body.append(details);
};

var insertReportDataToTop = async (reportData) => {
  var { reportId, year, dateFrom, dateTo, totalTaxAmount } = reportData;

  var reportTbodyId = `tbody_year_${year}_month_${month}`;

  var reportTbody = document.getElementById(reportTbodyId);

  if (!reportTbody) {
    var yearDetails = await createYearDetails(year, month, reportId);

    return document.body.prepend(yearDetails);
  }

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

  reportTbody.prepend(tr);

  return reportTbody;
};

export default insertReportDataToTop;
