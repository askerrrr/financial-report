var { getMondayIndex } = require("./monday");

var monthsList = [
  "декабрь",
  "ноябрь",
  "октябрь",
  "сентябрь",
  "август",
  "июль",
  "июнь",
  "май",
  "апрель",
  "март",
  "февраль",
  "январь",
];

var getMonthName = (monthNum) => monthsList[monthsList.length - monthNum];

var getMonthIndex = (month) => monthsList.indexOf(month);

var getMonthNameAndIndex = (monthNum) => {
  var monthName = getMonthName(monthNum);
  var monthIndex = getMonthIndex(monthName);

  return { monthIndex, monthName };
};

var getMonthReports = (date, reportId, carry) => {
  var mondayIndex = getMondayIndex(date);

  var reports = [];

  if (carry) {
    var mondaysQty = getMondaysQtyInMonth(date);
    reports[mondaysQty] = reportId;
    return reports;
  }

  reports[mondayIndex] = reportId;

  return reports;
};

module.exports = { getMonthReports, getMonthNameAndIndex };
