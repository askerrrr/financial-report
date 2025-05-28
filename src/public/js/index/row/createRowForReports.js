import getReportPeriod from "./services/getReportPeriod.js";
import getReportCreationDate from "./services/getReportCreationDate.js";
import createInputField from "../../report/row/services/createInputField.js";

var table = document.getElementById("reports");
var tbody = document.createElement("tbody");

var url = "/reports/period";

var createRowForReports = async (reports) => {
  for (var [index, report] of Object.entries(reports)) {
    var tr = document.createElement("tr");

    var { id, date, period } = report;

    var inputFieldForPeriod = await createInputField(
      period,
      index,
      "period",
      url
    );

    var period = await getReportPeriod(inputFieldForPeriod);

    var reportCreationDate = await getReportCreationDate(id, date);

    tr.append(period, reportCreationDate);

    tbody.append(tr);
  }

  table.append(tbody);

  return table;
};

export default createRowForReports;
