var dayStub = 15;
var mondayIndex = 1;
var sundayIndex = 0;
var reportRange = 6;
var firstMonthNum = 1;
var lastMonthNum = 12;

var checkAndFixMonday = (dateFrom) => {
  var [year, month, day] = dateFrom.split("-");

  var date = new Date(year, month - 1, day);
  var dayIndex = date.getDay();
  var daysPerMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  var isMonday = dayIndex === mondayIndex;

  if (isMonday) {
    return { dateFrom };
  }

  var isReportStartInPreviousMonth = +day - reportRange < 1;

  if (isReportStartInPreviousMonth) {
    var isFirstMonth = firstMonthNum === +month;

    if (isFirstMonth) {
      var prevYear = +year - 1;
      var lastMonthDate = new Date(prevYear, lastMonthNum, dayStub);
      var daysPerLastMonth = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 0).getDate();
      var mondayDay = daysPerLastMonth + +day - reportRange;

      dateFrom = `${prevYear}-${lastMonthNum}-${String(mondayDay).padStart(2, "0")}`;
    } else {
      var prevMonthNum = +month - 1;
      var prevMonthDate = new Date(year, prevMonthNum - 1, day);
      var daysPerPrevMonth = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth() + 1, 0).getDate();
      var mondayDay = daysPerPrevMonth + +day - reportRange;

      dateFrom = `${year}-${String(prevMonthNum).padStart(2, "0")}-${String(mondayDay).padStart(2, "0")}`;
    }
  } else {
    var mondayDay;
    var dayAsNum = +day;
    var isSunday = dayIndex === sundayIndex;

    if (isSunday) {
      mondayDay = dayAsNum - reportRange;
    } else {
      var dayIndexDiff = dayIndex - mondayIndex;
      mondayDay = dayAsNum - dayIndexDiff;
    }

    dateFrom = `${year}-${month}-${String(mondayDay).padStart(2, "0")}`;
  }

  return { dateFrom };
};

export default checkAndFixMonday;
