var { getMonthReports, getMonthNameAndIndex } = require("./month");
var { getMondaysQtyInMonth } = require("./monday");
var { setReportIdInReports } = require("./reports");

var getMonthsForCurrentYear = (monthNum, reports) => {
  var { monthName, monthIndex } = getMonthNameAndIndex(monthNum);

  var months = [];
  months[monthIndex] = { month: monthName, reports };

  return months;
};

var getMonthsForNewYear = (reports) => {
  var firstMonthIndex = 0,
    firstMonthName = "январь";

  var months = [];

  months[firstMonthIndex] = { month: firstMonthName, reports };

  return months;
};

var getFirstMonthReporstForNewYear = (date, reportId) => {
  var mondaysQty = getMondaysQtyInMonth(date);

  reports = [];

  reports[mondaysQty] = reportId;

  return reports;
};

var getMonthsData = (reportId, date, carry = null) => {
  var reports = getMonthReports(date, reportId, carry);

  var monthNum = date.split("-")[1];

  var { monthName, monthIndex } = getMonthNameAndIndex(monthNum);

  var months = new Array(12).fill(null);

  months[monthIndex] = { month: monthName, reports };

  return months;
};

var getMonthsFromYear = (years, yearIndex) => {
  var { months } = years[yearIndex];

  return months;
};

var updateYearStructure = (
  months,
  year,
  monthNum,
  reportDate,
  reportId,
  carry
) => {
  var { monthName, monthIndex } = getMonthNameAndIndex(monthNum);

  var reports = months[monthIndex]?.reports ?? [];

  reports = setReportIdInReports(reportDate, reports, reportId, carry);

  months[monthIndex] = { month: monthName, reports };

  return { year, months };
};

var isNextMonthReportNeeded = (dateFrom, dateTo) => {
  var [year, monthFrom, dayFrom] = dateFrom.split("-");
  var [y, monthTo, dayTo] = dateTo.split("-");

  if (monthFrom === monthTo) {
    return false;
  }

  var daysInCurrentMonth = new Date(year, monthFrom, 0).getDate();

  return daysInCurrentMonth - dayFrom + 1 < +dayTo;
};

var getNextYearFirstMonth = (months) =>
  months[0] ?? { month: "январь", reports: [] };

module.exports = {
  getMonthsData,
  getMonthsFromYear,
  updateYearStructure,
  getMonthsForNewYear,
  setReportIdInReports,
  getNextYearFirstMonth,
  getMonthsForCurrentYear,
  isNextMonthReportNeeded,
  getFirstMonthReporstForNewYear,
};
