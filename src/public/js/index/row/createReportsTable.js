import getReportPeriod from "./services/getReportPeriod.js";
import getReportLink from "./services/getReportLink.js";

var table = document.getElementById("reports");
var tbody = document.createElement("tbody");

var createReportsTable = async (reports) => {
  for (var report of reports) {
    var tr = document.createElement("tr");

    var { id, dateFrom, dateTo } = report;

    var period = await getReportPeriod(dateFrom, dateTo);

    var reportLink = await getReportLink(id);

    tr.append(period, reportLink);

    tbody.append(tr);
  }

  tbody.id = "tbody";

  table.append(tbody);

  return table;
};

export default createReportsTable;
