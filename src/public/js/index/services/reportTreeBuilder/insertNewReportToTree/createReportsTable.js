import createReportsTableHead from "./table/createReportsTableHead.js";

var createReportsTable = (year, reportRow, month) => {
  var tbodyId = `tbody_year_${year}_month_${month}`;
  var tbody = document.getElementById(tbodyId);

  if (!tbody) {
    tbody = document.createElement("tbody");

    tbody.id = tbodyId;
    tbody.append(reportRow);

    var tableHead = createReportsTableHead();

    var table = document.createElement("table");
    table.append(tableHead, tbody);

    return table;
  }

  tbody.append(reportRow);

  return tbody;
};

export default createReportsTable;
