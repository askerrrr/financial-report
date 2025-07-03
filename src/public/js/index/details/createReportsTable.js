import getReportsData from "../services/getReportsData.js";
import createTdElement from "../../report/row/services/createTdElement.js";
import getReportLink from "../services/reportTreeBuilder/table/getReportLink.js";
import getReportPeriod from "../services/reportTreeBuilder/table/getReportPeriod.js";
import createReportsTableHead from "../services/reportTreeBuilder/table/createReportsTableHead.js";

var createReportsTable = async (year, month, reportIds) => {
  var table = document.createElement("table");

  var tbody = document.createElement("tbody");
  tbody.id = `tbody_year_${year}_month_${month}`;

  var { reports } = await getReportsData();

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

export default createReportsTable;
