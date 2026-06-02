import createTdElement from "../../report/table/services/createTdElement.js";
import getReportPeriod from "../services/reportTreeBuilder/insertNewReportToTree/table/getReportPeriod.js";

var insertDataToTable = (data, tbodyId) => {
  var tbody = document.getElementById(tbodyId);

  for (var { dateFrom, dateTo, failedCount } of data) {
    var tableRow = document.createElement("tr");

    var period = getReportPeriod(dateFrom, dateTo);
    var periodTdElement = createTdElement(period);

    var failedCountTdElement = createTdElement(failedCount);

    tableRow.append(periodTdElement, failedCountTdElement);

    tbody.append(tableRow);
  }
};

export default insertDataToTable;
