import getNextPeriod from "./services/getNextPeriod.js";
import hasPeriodOverlap from "./services/hasPeriodOverlap.js";
import { getMondaysOrSundaysOfMonth } from "./services/getMondaysOrSundaysOfMonth.js";

var getDateToByDateFrom = async (dateFrom) => {
  var [year, month, day] = dateFrom.split("-").map(Number);

  var dateTo;

  if (hasPeriodOverlap(year, month, day)) {
    var nextPeriod = getNextPeriod(year, month);
    var { sundays } = getMondaysOrSundaysOfMonth(nextPeriod, "sunday");

    var firstSandayIndex = 0;

    dateTo = sundays[firstSandayIndex];

    var trancatedDate = dateTo.split("T")[0];
    return trancatedDate;
  }

  var { mondays } = getMondaysOrSundaysOfMonth(dateFrom, "monday");
  var dateFromISO = new Date(dateFrom).toISOString();
  var mondayIndex = mondays.indexOf(dateFromISO);

  var { sundays } = getMondaysOrSundaysOfMonth(dateFrom, "sunday");
  var sandayIndex = ++mondayIndex;

  dateTo = sundays[sandayIndex];

  var trancatedDate = dateTo.split("T")[0];
  return trancatedDate;
};

export default getDateToByDateFrom;
