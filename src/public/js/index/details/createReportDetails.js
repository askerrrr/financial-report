import createReportsTableHead from "../row/services/createReportsTableHead.js";

var createReportsTable = async (reports) => {
  var table = document.createElement("table");
  var tbody = document.createElement("tbody");

  for (var reportId of reports) {
    var tr = document.createElement("tr");

    if (reportId) {
      tr.append(reportId);
      tbody.append(tr);
    }
  }

  var tableHead = await createReportsTableHead();

  table.append(tbody, tableHead);

  return table;
};

var getReportsDetail = async (reports) => {
  var div = document.createElement("div");

  for (var reportId of reports) {
    var details = document.createElement("details");
    var summary = document.createElement("summary");

    if (reportId) {
      details.append(reportId);
      div.append(details);
    }
  }

  return div;
};

var getMonthsDetails = async (months, year) => {
  var div = document.createElement("div");
  div.id = `months_container_${year}`;

  for (var monthData of months) {
    var details = document.createElement("details");
    var summary = document.createElement("summary");

    if (monthData) {
      var { month, reports } = monthData;
      summary.append(month);

      details.id = `reports_container_${year}_${month}`;

      var reportsTable = await createReportsTable(reports);

      details.append(summary, reportsTable  );

      div.append(details);
    }
  }

  return div;
};

var createPeriodDetails = async (years) => {
  for (var { year, months } of years) {
    console.log("year: ", year);
    console.log(months);

    var details = document.createElement("details");
    details.id = year;

    var summary = document.createElement("summary");

    summary.append(year);

    details.append(summary, await getMonthsDetails(months, year));

    document.body.append(details);
  }
};

export default createPeriodDetails;
