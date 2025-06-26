var compareYears = (periodStartYear, periodEndYear) =>
  periodStartYear === periodEndYear;

var checkYearIsExists = (years, year) =>
  years?.find((date) => date.year === year);

var getYearIndex = (years, year) =>
  years.findIndex((date) => date.year === year);

var isNextYearReportRequired = (dateFrom, dateTo) => {
  var yearFrom = dateFrom.split("-")[0];
  var yearTo = dateTo.split("-")[0];

  return yearFrom !== yearTo;
};

module.exports = {
  getYearIndex,
  compareYears,
  checkYearIsExists,
  isNextYearReportRequired,
};
