import getNextMonth from "./getNextMonth.js";
import getNextYearDate from "./getNextYearDate.js";

var getNextPeriod = (currentYear, currentMonth) => {
  var { nextMonth } = getNextMonth(currentMonth);

  if (nextMonth > 12) {
    var nextYear = ++currentYear;

    var nextYearDate = getNextYearDate(nextYear);

    return nextYearDate;
  }

  var currentYearDate = [currentYear, nextMonth, "15"].join("-");

  return currentYearDate;
};

export default getNextPeriod;
