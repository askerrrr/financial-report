import createReportsTableHead from "./table/createReportsTableHead.js";

var createReportsTable = async (reportRow) => {
  var tbodyId = `tbody_year_${year}_month_${month}`;
  var tbody = document.getElementById(tbodyId);

  if (!tbody) {
    tbody = document.createElement("tbody");

    var { year } = reportData;

    tbody.id = tbodyId;
    tbody.append(reportRow);

    var tableHead = await createReportsTableHead();

    var table = document.createElement("table");
    table.append(tableHead, tbody);

    return table;
  }

  tbody.append(tr);

  return tbody;
};

export default createReportsTable;
