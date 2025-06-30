var { getYearIndex } = require("./year");
var { getMonthNameAndIndex } = require("./month");
var { getMondayIndex, getMondaysQtyInMonth } = require("./monday");

var setReportIdInReports = (
  date,
  reports,
  reportId,
  fullPeriod,
  monthCarry = null
) => {
  var mondayIndex = getMondayIndex(date);

  if (monthCarry) {
    var mondaysQty = getMondaysQtyInMonth(date);
    reports[mondaysQty] = { fullPeriod, reportId };

    return reports;
  }

  reports[mondayIndex] = { fullPeriod, reportId };

  return reports;
};

var getReportsFromMonth = (months, monthNum) => {
  var { monthIndex } = getMonthNameAndIndex(monthNum);

  var { reports } = months[monthIndex];

  return reports;
};

module.exports = {
  getReportsFromMonth,
  setReportIdInReports,
};
