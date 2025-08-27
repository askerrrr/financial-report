import getReportLink from "./table/getReportLink.js";
import getReportPeriod from "./table/getReportPeriod.js";
import createReportsTableHead from "./table/createReportsTableHead.js";
import createTdElement from "../../../../report/table/services/createTdElement.js";

var createReportRow = async (reportData, monthName, reportTbody = null) => {
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

  var totalFinalProfitTd = await createTdElement(
    0,
    null,
    null,
    "totalFinalProfit"
  );

  var tr = document.createElement("tr");

  tr.append(
    reportPeriod,
    totalFinalProfitTd,
    totalProductCostsTd,
    totalTaxAmountTd,
    reportLink
  );

  if (!reportTbody) {
    reportTbody = document.createElement("tbody");

    var { year } = reportData;

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

export default createReportRow;
