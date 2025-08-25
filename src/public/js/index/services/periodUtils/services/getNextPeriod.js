import getNextMonth from "./getNextMonth.js";
import getNextYearDate from "./getNextYearDate.js";

var getNextPeriod = (currentYear, currentMonth, currentDay) => {
  var nextMonth = getNextMonth(+currentMonth);

  if (+nextMonth > 12) {
    var nextYear = ++currentYear;

    var nextYearDate = getNextYearDate(nextYear);

    return nextYearDate;
  }

  var currentYearDate = [currentYear, nextMonth, currentDay].join("-");

  return currentYearDate;
};

export default getNextPeriod;
