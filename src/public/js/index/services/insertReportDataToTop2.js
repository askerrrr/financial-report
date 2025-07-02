import getReportLink from "../row/services/getReportLink.js";
import getReportPeriod from "../row/services/getReportPeriod.js";
import createTdElement from "../../report/row/services/createTdElement.js";
import createReportsTableHead from "../row/services/createReportsTableHead.js";

var monthsList = [
  "декабрь",
  "ноябрь",
  "октябрь",
  "сентябрь",
  "август",
  "июль",
  "июнь",
  "май",
  "апрель",
  "март",
  "февраль",
  "январь",
];

var getMonthNameByNum = async (monthNum) =>
  monthsList[monthsList.length - monthNum];

var createReportRow = async (reportData, reportTbody = null) => {
  var { dateFrom, dateTo, reportId, totalTaxAmount } = reportData;

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

  if (!reportTbody) {
    reportTbody = document.createElement("tbody");

    var { year, month } = reportData;

    var monthName = await getMonthNameByNum(month);

    reportTbody.id = `tbody_year_${year}_month_${monthName}`;

    reportTbody.append(tr);

    var tableHead = await createReportsTableHead();

    var table = document.createElement("table");

    table.append(tableHead, reportTbody);

    return table;
  }

  reportTbody.append(tr);

  return reportTbody;
};

var createMonthDetails = async (reportData) => {
  var { month } = reportData;

  var monthName = await getMonthNameByNum(month);

  var summary = document.createElement("summary");
  summary.append(monthName);

  var reportRow = await createReportRow(reportData);

  var details = document.createElement("details");
  details.append(summary, reportRow);

  var div = document.createElement("div");

  div.append(details);

  return div;
};

var createYearDetails = async (reportData) => {
  var { year } = reportData;

  var summary = document.createElement("summary");
  summary.append(year);

  var monthDetails = await createMonthDetails(reportData);

  var details = document.createElement("details");
  details.id = year;

  details.append(summary, monthDetails);

  return details;
};

var insertReportDataToTop = async (reportData) => {
  try {
    var { year } = reportData;

    var yearDetailsId = year;

    var yearDetails = document.getElementById(yearDetailsId);

    console.log("yearDetails: ", yearDetails);

    if (!yearDetails) {
      console.log("yearDetails is null: ", yearDetails);

      var yearDetails = await createYearDetails(reportData);

      document.getElementById("years_container").prepend(yearDetails);

      return;
    }

    var reportTbodyId = `tbody_year_${year}_month_${month}`;

    var reportTbody = document.getElementById(reportTbodyId);

    console.log("reportTbody: ", reportTbody);

    if (!reportTbody) {
      var { month } = reportData;

      console.log("reportTbody is null: ", reportTbody);

      var reportsContainerId = `reports_container_${year}_${month}`;

      var reportsContainer = document.getElementById(reportsContainerId);

      var reportRow = await createReportRow(reportData);

      reportsContainer.append(reportRow);

      return;
    }

    return await createReportRow(reportData, reportTbody);
  } catch (e) {
    console.log("error: ", e);
  }
};

export default insertReportDataToTop;
