import createTdElement from "../../report/row/services/createTdElement.js";
import getReportPeriod from "./services/getReportPeriod.js";
import getReportLink from "./services/getReportLink.js";

var table = document.getElementById("reports");
var tbody = document.createElement("tbody");

var createReportsTable = async (reports) => {
  for (var report of reports) {
    var tr = document.createElement("tr");

    var {
      id,
      dateFrom,
      dateTo,
      totalTaxAmount,
      totalProductCosts,
      totalFinalNetProfit,
    } = report;

    var period = await getReportPeriod(dateFrom, dateTo);

    var totalProductCostsTd = await createTdElement(totalProductCosts);

    var totalTaxAmountTd = await createTdElement(totalTaxAmount);

    var totalFinalNetProfitTd = await createTdElement(
      totalFinalNetProfit,
      null,
      null,
      "totalFinalNetProfit"
    );

    if (totalFinalNetProfit < 0) {
      totalFinalNetProfitTd.style.color = "red";
    }

    var reportLink = await getReportLink(id);

    tr.append(
      period,
      totalFinalNetProfitTd,
      totalProductCostsTd,
      totalTaxAmountTd,
      reportLink
    );

    tbody.append(tr);
  }

  tbody.id = "tbody";

  table.append(tbody);

  return table;
};

export default createReportsTable;
