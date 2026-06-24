var months = ["января", "февряля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

var getReportPeriod = (dateFrom, dateTo) => {
  var [startYear, startMonth, startDay] = dateFrom.split("-").map(Number);
  var startMonthName = months[startMonth - 1];

  var [endYear, endMonth, endDay] = dateTo.split("-").map(Number);
  var endMonthName = months[endMonth - 1];

  var reportPeriod = `с ${startDay} ${startMonthName} ${startYear} по ${endDay} ${endMonthName} ${endYear}`;
  return { reportPeriod };
};

export default getReportPeriod;
