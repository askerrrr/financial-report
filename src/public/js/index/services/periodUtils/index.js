import isMonday from "./services/isMonday.js";
import truncateDate from "./services/truncateDate.js";
import getNextPeriod from "./services/getNextPeriod.js";
import replaceDashToDot from "./services/replaceDashToDot.js";
import hasPeriodOverlap from "./services/hasPeriodOverlap.js";
import getWeekDaysFromMonth from "./services/getWeekDaysFromMonth.js";

var getDateToByDateFrom = async (dateFrom) => {
  var mondays = getWeekDaysFromMonth(dateFrom, "monday");

  if (!isMonday(dateFrom, mondays)) {
    return alert("Начало отчетного периода не является понедельником");
  }

  var [year, month, day] = dateFrom.split("-");

  var sandays, dateTo;

  var overlap = hasPeriodOverlap(year, month, day);

  if (overlap) {
    var nextPeriod = getNextPeriod(year, month, day);

    sandays = getWeekDaysFromMonth(nextPeriod, "sanday");

    var firstSandayIndex = 0;

    dateTo = sandays[firstSandayIndex];

    var trancatedDate = truncateDate(dateTo);

    var dateToWithDots = replaceDashToDot(trancatedDate);

    return dateToWithDots;
  }

  sandays = getWeekDaysFromMonth(dateFrom, "sanday");

  var dateFromISO = new Date(dateFrom).toISOString();

  var mondayIndex = mondays.indexOf(dateFromISO);

  var sandayIndex = ++mondayIndex;

  dateTo = sandays[sandayIndex];
  console.log("dateTo: ", dateTo);
  var trancatedDate = truncateDate(dateTo);

  var dateToWithDots = replaceDashToDot(trancatedDate);

  return dateToWithDots;
};

export default getDateToByDateFrom;
