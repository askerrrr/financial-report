import getReportPeriod from "./services/getReportPeriod.js";
import getReportCreationDate from "./services/getReportCreationDate.js";

var table = document.getElementById("reports");
var tbody = document.createElement("tbody");

var createRowForReports = async (reports) => {
  for (var report of reports) {
    var tr = document.createElement("tr");

    var { id, date, period } = report;

    tr.append(
      await getReportPeriod(period),
      await getReportCreationDate(id, date)
    );

    tbody.append(tr);
  }

  table.append(tbody);

  return table;
};

export default createRowForReports;
