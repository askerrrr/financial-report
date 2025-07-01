var getMonthMondays = async (reportsDate) => {
  var d = new Date(reportsDate),
    month = d.getMonth(),
    weekDays = [];

  d.setDate(1);

  while (d.getDay() !== 1) {
    d.setDate(d.getDate() + 1);
  }

  while (d.getMonth() === month) {
    weekDays.push(new Date(d.getTime()).toISOString());

    d.setDate(d.getDate() + 7);
  }

  return weekDays.reverse();
};

var getMondayIndex = async (date) => {
  var mondays = await getMonthMondays(date);

  var mondayIndex = mondays.findIndex(
    (monday) => monday === new Date(date).toISOString()
  );

  return mondayIndex === -1 ? 0 : mondayIndex;
};

var getMondaysQtyInMonth = async (date) => {
  var mondays = await getMonthMondays(date);
  return mondays.length;
};

module.exports = { getMondayIndex, getMonthMondays, getMondaysQtyInMonth };
