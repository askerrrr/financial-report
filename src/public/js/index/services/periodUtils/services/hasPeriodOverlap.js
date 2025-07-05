var hasPeriodOverlap = (year, month, day) => {
  var reportRange = 7,
    daysInMonth = new Date(year, month, 0).getDate();

  var overlap = daysInMonth - day < reportRange;

  return overlap;
};

export default hasPeriodOverlap;
