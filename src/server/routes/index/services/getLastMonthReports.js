var getLastMonthReports = (reports, lastMonthReportIds) => {
  var lastMonthReports = [];

  for (var item of reports) {
    if (lastMonthReportIds.find(({ reportId }) => reportId == item.id)) {
      lastMonthReports.push(item);
    }
  }

  return { lastMonthReports };
};

module.exports = getLastMonthReports;
