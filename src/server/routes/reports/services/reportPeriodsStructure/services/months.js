var { getMonthReportIds, getMonthNameAndIndex } = require("./month");
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

var getFirstMonthReporstForNewYear = (date, fullPeriod, reportId) => {
  var mondaysQty = getMondaysQtyInMonth(date);

  var reportIds = [];

  reportIds[mondaysQty] = { fullPeriod, reportId };

  return reportIds;
};

var getMonthsData = (reportId, fullPeriod, date, carry = null) => {
  var reportIds = getMonthReportIds(date, fullPeriod, reportId, carry);

  var monthNum = date.split("-")[1];

  var { monthName, monthIndex } = getMonthNameAndIndex(monthNum);

  var months = new Array(12).fill(null);

  months[monthIndex] = { month: monthName, reportIds };

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
  fullPeriod,
  carry
) => {
  var { monthName, monthIndex } = getMonthNameAndIndex(monthNum);

  var reportIds = months[monthIndex]?.reports ?? [];

  reportIds = setReportIdInReports(
    reportDate,
    reportIds,
    reportId,
    fullPeriod,
    carry
  );

  months[monthIndex] = { month: monthName, reportIds };

  return { year, months };
};

var isNextMonthReportNeeded = (dateFrom, dateTo) => {
  var [year, monthFrom, dayFrom] = dateFrom.split("-");
  var [y, monthTo, dayTo] = dateTo.split("-");

  if (monthFrom === monthTo) {
    return;
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
