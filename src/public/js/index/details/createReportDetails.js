import getReportLink from "../row/services/getReportLink.js";
import getCookieByName from "../services/getCookieByName.js";
import getReportPeriod from "../row/services/getReportPeriod.js";
import createTdElement from "../../report/row/services/createTdElement.js";
import createReportsTableHead from "../row/services/createReportsTableHead.js";

var userId = getCookieByName("userId");

var getReportsData = async () => {
  var res = await fetch("/api/" + userId);

  if (!res.ok) {
    return alert("Не удалось загрузить отчеты");
  }

  var { reports } = await res.json();

  return reports;
};

var createReportsTable = async (month, reportIds) => {
  var table = document.createElement("table");

  var tbody = document.createElement("tbody");
  tbody.id = "tbody_month_" + month;

  var reports = await getReportsData();

  for (var { reportId } of reportIds) {
    var tr = document.createElement("tr");

    if (reportId) {
      var report = reports.find((report) => report.id == reportId);

      var {
        id,
        dateFrom,
        dateTo,
        totalFinalNetProfit,
        totalProductCosts,
        totalTaxAmount,
      } = report;

      var fullPeriodTd = await getReportPeriod(dateFrom, dateTo);

      var totalFinalNetProfitTd = await createTdElement(
        totalFinalNetProfit,
        null,
        null,
        "totalFinalNetProfit"
      );

      var totalProductCostsTd = await createTdElement(totalProductCosts);
      var totalTaxAmountTd = await createTdElement(totalTaxAmount);
      var reportLink = await getReportLink(id);

      tr.append(
        fullPeriodTd,
        totalFinalNetProfitTd,
        totalProductCostsTd,
        totalTaxAmountTd,
        reportLink
      );

      tbody.append(tr);
    }
  }

  var tableHead = await createReportsTableHead();
  table.append(tableHead, tbody);

  return table;
};

var getMonthsDetails = async (months, year) => {
  var div = document.createElement("div");
  div.id = `months_container_${year}`;

  for (var monthData of months) {
    var details = document.createElement("details");
    var summary = document.createElement("summary");

    if (monthData) {
      var { month, reportIds } = monthData;
      summary.append(month);

      details.id = `reports_container_${year}_${month}`;

      var reportsTable = await createReportsTable(month, reportIds);

      details.append(summary, reportsTable);

      div.append(details);
    }
  }

  return div;
};

var createPeriodDetails = async (years) => {
  for (var { year, months } of years) {
    console.log("year: ", year);
    console.log(months);

    var details = document.createElement("details");
    details.id = year;

    var summary = document.createElement("summary");

    summary.append(year);

    details.append(summary, await getMonthsDetails(months, year));

    document.body.append(details);
  }
};

export default createPeriodDetails;
