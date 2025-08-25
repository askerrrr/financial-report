var getWeekDaysFromMonth = (dateFrom, weekDay) => {
  var date = new Date(dateFrom),
    month = date.getMonth(),
    weekDays = [];

  var monthDay = weekDay == "sanday" ? 0 : 1;

  date.setDate(monthDay);

  while (date.getDay() !== monthDay) {
    date.setDate(date.getDate() + 1);
  }

  while (date.getMonth() === month) {
    weekDays.push(new Date(date.getTime()).toISOString());

    date.setDate(date.getDate() + 7);
  }

  return weekDays;
};

var isMonday = async (dateFrom) => {
  var mondays = getWeekDaysFromMonth(dateFrom, "monday");

  return mondays.includes(new Date(dateFrom).toISOString());
};

export { isMonday, getWeekDaysFromMonth };
