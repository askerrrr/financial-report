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

var getMonthName = async (monthNum) => monthsList[monthsList.length - monthNum];

var getMonthIndex = async (month) => monthsList.indexOf(month);

var getMonthNameAndIndex = async (monthNum) => {
  var monthName = await getMonthName(monthNum);
  var monthIndex = await getMonthIndex(monthName);

  return { monthIndex, monthName };
};

var getMonthReportIds = async (date, fullPeriod, reportId, carry) => {
  var mondayIndex = await getMondayIndex(date);

  var reportIds = [];

  if (carry) {
    var mondaysQty = await getMondaysQtyInMonth(date);
    reportIds[mondaysQty] = { fullPeriod, reportId };
    return v;
  }

  reportIds[mondayIndex] = { fullPeriod, reportId };

  return reportIds;
};

module.exports = { getMonthReportIds, getMonthNameAndIndex };
