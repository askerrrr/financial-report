var { getYearIndex } = require("./year");
var { getMonthNameAndIndex } = require("./month");
var { getMondayIndex, getMondaysQtyInMonth } = require("./monday");

var setReportIdInReports = (date, reports, reportId, monthCarry = null) => {
  var mondayIndex = getMondayIndex(date);

  if (monthCarry) {
    var mondaysQty = getMondaysQtyInMonth(date);
    reports[mondaysQty] = reportId;

    return reports;
  }

  reports[mondayIndex] = reportId;

  return reports;
};

var getReportsFromMonth = (months, monthNum) => {
  var { monthIndex } = getMonthNameAndIndex(monthNum);

  var { reports } = months[monthIndex];

  return reports;
};

var updateReportIdInYearStructure = (date, years, year, monthNum, reportId) => {
  var yearIndex = getYearIndex(years, year);

  var { months } = years[yearIndex];

  var { monthIndex, monthName } = getMonthNameAndIndex(monthNum);

  var { reports } = months[monthIndex];

  var mondayIndex = getMondayIndex(date);

  reports[mondayIndex] = reportId;

  months[monthIndex] = { month: monthName, reports };

  return { year, months };
};

module.exports = {
  getReportsFromMonth,
  setReportIdInReports,
  updateReportIdInYearStructure,
};
