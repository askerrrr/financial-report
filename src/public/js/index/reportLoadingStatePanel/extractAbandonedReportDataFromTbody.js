var extractAbandonedReportDataFromTbody = (tableBody) => {
  var reportPeriods = [];

  for (var tableRow of tableBody.children) {
    var dateFrom = tableRow.getAttribute("dateFrom");
    var dateTo = tableRow.getAttribute("dateTo");

    reportPeriods.push({ dateFrom, dateTo, index: tableRow.id, failedCount: 0 });
  }

  return { reportPeriods };
};

export default extractAbandonedReportDataFromTbody;
