var extractAbandonedReportDataFromTbody = (tableBody) => {
  var reportPeriods = [];

  for (var tableRow of tableBody.children) {
    var dateFrom = tableRow.getAttribute("dateFrom");
    var dateTo = tableRow.getAttribute("dateTo");

    reportPeriods.push({ dateFrom, dateTo });
  }

  return { reportPeriods };
};

export default extractAbandonedReportDataFromTbody;
