import getReportLink from "../row/services/getReportLink.js";
import createTdElement from "../../report/row/services/createTdElement.js";
import createReportsTableHead from "../row/services/createReportsTableHead.js";

var createReportsTable = async (month, reports) => {
  var table = document.createElement("table");

  var tbody = document.createElement("tbody");
  tbody.id = "tbody_month_" + month;

  for (var { fullPeriod, reportId } of reports) {
    var tr = document.createElement("tr");

    if (reportId) {
      var fullPeriodTd = await createTdElement(fullPeriod, "", null, null);
      var totalFinalNetProfitTd = await createTdElement(
        "totalFinalNetProfit",
        null,
        null,
        "totalFinalNetProfit"
      );

      var totalProductCostsTd = await createTdElement("totalProductCosts");
      var totalTaxAmountTd = await createTdElement("totalTaxAmount");
      var reportLink = await getReportLink(reportId);

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
  table.append(tbody, tableHead);

  return table;
};

var getMonthsDetails = async (months, year) => {
  var div = document.createElement("div");
  div.id = `months_container_${year}`;

  for (var monthData of months) {
    var details = document.createElement("details");
    var summary = document.createElement("summary");

    if (monthData) {
      var { month, reports } = monthData;
      summary.append(month);

      details.id = `reports_container_${year}_${month}`;

      var reportsTable = await createReportsTable(month, reports);

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
