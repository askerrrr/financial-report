var { getYearIndex } = require("./year");
var { getMonthNameAndIndex } = require("./month");
var { getMondayIndex, getMondaysQtyInMonth } = require("./monday");

var setReportIdInReports = (
  date,
  reportIds,
  reportId,
  fullPeriod,
  monthCarry = null
) => {
  var mondayIndex = getMondayIndex(date);

  if (monthCarry) {
    var mondaysQty = getMondaysQtyInMonth(date);
    reportIds[mondaysQty] = { fullPeriod, reportId };

    return reportIds;
  }

  reportIds[mondayIndex] = { fullPeriod, reportId };

  return reportIds;
};

var getReportsFromMonth = (months, monthNum) => {
  var { monthIndex } = getMonthNameAndIndex(monthNum);

  var { reportIds } = months[monthIndex];

  return reportIds;
};

module.exports = {
  getReportsFromMonth,
  setReportIdInReports,
};
