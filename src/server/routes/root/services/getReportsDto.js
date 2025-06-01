var getReportsDto = async (reports) => {
  var data = [];

  for (var report of reports) {
    data.push({
      id: report.reportId,
      dateFrom: report.dateFrom,
      dateTo: report.dateTo,
    });
  }

  return data;
};

module.exports = getReportsDto;
