var splitWeeklyFinancialReportByYear = async (report, startYear) => {
  var startYearWeeklyFinancialReport = [];
  var endYearWeeklyFinancialReport = [];

  for (var item of report) {
    var saleYear = +item.split("T")[0].split("-")[0];

    if (saleYear === startYear) {
      startYearWeeklyFinancialReport.push(item);
    } else {
      endYearWeeklyFinancialReport.push(item);
    }
  }

  return { startYearWeeklyFinancialReport, endYearWeeklyFinancialReport };
};

module.exports = splitWeeklyFinancialReportByYear;
