import createReportsTable from "./createReportsTable.js";

var createMonthsDetails = async (months, year) => {
  var div = document.createElement("div");
  div.id = `months_container_${year}`;

  for (var monthData of months) {
    var details = document.createElement("details");
    var summary = document.createElement("summary");

    if (monthData) {
      var { month, reportIds } = monthData;
      summary.append(month);

      details.id = `reports_container_${year}_${month}`;

      var reportsTable = await createReportsTable(year, month, reportIds);

      details.append(summary, reportsTable);

      div.append(details);
    }
  }

  return div;
};

export default createMonthsDetails;
