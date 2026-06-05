import getReportLink from "./table/getReportLink.js";
import getReportPeriod from "./table/getReportPeriod.js";
import createTdElement from "../../../../report/table/services/createTdElement.js";

var createReportRow = (reportData) => {
  var { dateFrom, dateTo, reportId, totalTaxAmount } = reportData;

  var reportPeriod = getReportPeriod(dateFrom, dateTo);

  var reportLink = getReportLink(reportId);

  var totalProductCostsTd = createTdElement(0, null, null, "totalProductCosts");

  var totalTaxAmountTd = createTdElement(totalTaxAmount, null, null, "totalTaxAmount");

  var totalFinalProfitTd = createTdElement(0, null, null, "totalFinalProfit");

  var financesAccountedTd = createTdElement();

  financesAccountedTd.textContent = "";
  financesAccountedTd.innerHTML = '<span style="color: red;">&#10008;</span>';

  var tr = document.createElement("tr");
  tr.id = reportId;

  tr.append(reportPeriod, totalFinalProfitTd, totalProductCostsTd, totalTaxAmountTd, financesAccountedTd, reportLink);

  return tr;
};

export default createReportRow;
