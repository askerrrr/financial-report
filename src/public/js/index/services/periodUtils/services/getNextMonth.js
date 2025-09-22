var getNextMonth = (currentMonth) => {
  var nextMonth;

  if (currentMonth > 9) {
    nextMonth = "0" + currentMonth + 1;
    return nextMonth;
  }

  if (currentMonth === 9) {
    nextMonth = 10;
    return nextMonth;
  }

  nextMonth = currentMonth + 1;

  return nextMonth;
};

export default getNextMonth;
