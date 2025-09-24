import truncateDate from "./services/truncateDate.js";
import getNextPeriod from "./services/getNextPeriod.js";
import replaceDashToDot from "./services/replaceDashToDot.js";
import hasPeriodOverlap from "./services/hasPeriodOverlap.js";
import { getWeekDaysFromMonth } from "./services/getWeekDaysFromMonth.js";

var getDateToByDateFrom = async (dateFrom) => {
  var [year, month, day] = dateFrom.split("-").map(Number);

  var sundays, dateTo;

  var overlap = hasPeriodOverlap(year, month, day);

  if (overlap) {
    var nextPeriod = getNextPeriod(year, month);
    sundays = getWeekDaysFromMonth(nextPeriod, "sunday");

    var firstSandayIndex = 0;

    dateTo = sundays[firstSandayIndex];

    var trancatedDate = truncateDate(dateTo);

    var dateToWithDots = replaceDashToDot(trancatedDate);

    return dateToWithDots;
  }

  var mondays = getWeekDaysFromMonth(dateFrom, "monday");
  var dateFromISO = new Date(dateFrom).toISOString();
  var mondayIndex = mondays.indexOf(dateFromISO);

  sundays = getWeekDaysFromMonth(dateFrom, "sunday");
  var dateFromISO = new Date(dateFrom).toISOString();

  var sandayIndex = ++mondayIndex;

  dateTo = sundays[sandayIndex];

  var trancatedDate = truncateDate(dateTo);

  var dateToWithDots = replaceDashToDot(trancatedDate);

  return dateToWithDots;
};

export default getDateToByDateFrom;
