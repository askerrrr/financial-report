var extractAbandonedReportDataFromTbody = (tableBody) => {
  var abandonedReportPeriods = [];

  for (var tableRow of tableBody.children) {
    var dateFrom = tableRow.getAttribute("dateFrom");
    var dateTo = tableRow.getAttribute("dateTo");

    abandonedReportPeriods.push({ dateFrom, dateTo, index: +tableRow.id, failedCount: 0 });
  }

  return { abandonedReportPeriods };
};

export default extractAbandonedReportDataFromTbody;
