var getNextMonth = (currentMonth) => {
  var nextMonth;

  if (currentMonth < 10) {
    nextMonth = "0" + (currentMonth + 1);

    return nextMonth;
  }

  nextMonth = ++currentMonth;

  return nextMonth;
};

export default getNextMonth;
