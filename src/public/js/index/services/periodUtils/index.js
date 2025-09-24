import truncateDate from "./services/truncateDate.js";
import getNextPeriod from "./services/getNextPeriod.js";
import hasPeriodOverlap from "./services/hasPeriodOverlap.js";
import { getWeekDaysFromMonth } from "./services/getWeekDaysFromMonth.js";

var getDateToByDateFrom = async (dateFrom) => {
  var [year, month, day] = dateFrom.split("-").map(Number);

  var sundays, dateTo;

  if (hasPeriodOverlap(year, month, day)) {
    var nextPeriod = getNextPeriod(year, month);
    sundays = getWeekDaysFromMonth(nextPeriod, "sunday");

    var firstSandayIndex = 0;

    dateTo = sundays[firstSandayIndex];

    var trancatedDate = truncateDate(dateTo);
    return trancatedDate;
  }

  var mondays = getWeekDaysFromMonth(dateFrom, "monday");
  var dateFromISO = new Date(dateFrom).toISOString();
  var mondayIndex = mondays.indexOf(dateFromISO);

  sundays = getWeekDaysFromMonth(dateFrom, "sunday");
  var sandayIndex = ++mondayIndex;

  dateTo = sundays[sandayIndex];

  var trancatedDate = truncateDate(dateTo);
  return trancatedDate;
};

export default getDateToByDateFrom;
