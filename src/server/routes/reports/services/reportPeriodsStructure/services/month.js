var { getMondayIndex } = require("./monday");

var monthsList = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

var getMonthName = (monthNum) => monthsList[+monthNum - 1];

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
