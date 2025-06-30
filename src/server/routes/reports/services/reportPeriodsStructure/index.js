var {
  getYearIndex,
  compareYears,
  checkYearIsExists,
} = require("./services/year");
var {
  getMonthsData,
  getMonthsFromYear,
  getMonthsForNewYear,
  updateYearStructure,
  getNextYearFirstMonth,
  isNextMonthReportNeeded,
  getFirstMonthReporstForNewYear,
} = require("./services/months");
var { setReportIdInReports } = require("./services/reports");

var organizeReportsByPeriod = (dateFrom, dateTo, reportId, years) => {
  var [periodStartYear, periodStartMonth] = dateFrom.split("-");
  var fullPeriod = `${dateFrom} ${dateTo}`;

  var [periodEndYear, periodEndMonth] = dateTo.split("-");

  var yearIsExist = checkYearIsExists(years, periodStartYear);

  if (!yearIsExist) {
    console.log("года нет");
    var isSingleYearReport = compareYears(periodStartYear, periodEndYear);

    if (!isSingleYearReport) {
      if (isNextMonthReportNeeded(dateFrom, dateTo)) {
        console.log(
          "нужен переход на следующий месяц, а значит и на следующий год"
        );

        var periodEndYearIsExist = checkYearIsExists(years, periodEndYear);

        if (periodEndYearIsExist) {
          console.log("следующий год есть в списке");
          var periodEndYearIndex = getYearIndex(years, periodEndYear);
          var { months } = years[periodEndYearIndex];

          var { month, reports } = getNextYearFirstMonth(months);

          reports = setReportIdInReports(
            dateTo,
            reports,
            reportId,
            fullPeriod,
            "carry"
          );

          months[0] = { month, reports };

          years[periodEndYearIndex] = { year: periodEndYear, months };

          return years;
        } else {
          console.log("следующего года нет в списке");

          var reports = getFirstMonthReporstForNewYear(
            dateTo,
            fullPeriod,
            reportId
          );

          var months = getMonthsForNewYear(reports);

          years.push({ year: periodEndYear, months });

          return years;
        }
      }

      var months = getMonthsData(reportId, dateFrom);
      years.push({ year: periodStartYear, months });
      return years;
    }

    if (isNextMonthReportNeeded(dateFrom, dateTo)) {
      console.log("нужен переход на следующий месяц");

      var months = getMonthsData(reportId, fullPeriod, dateTo, "carry");

      years.push({ year: periodStartYear, months });

      return years;
    }

    var months = getMonthsData(reportId, fullPeriod, dateFrom);

    years.push({ year: periodStartYear, months });

    return years;
  }

  var isSingleYearReport = compareYears(periodStartYear, periodEndYear);

  if (!isSingleYearReport) {
    if (isNextMonthReportNeeded(dateFrom, dateTo)) {
      var nextYearIsExist = checkYearIsExists(years, periodEndYear);

      if (!nextYearIsExist) {
        console.log("следующего года нет, создаем все с нуля и пушаем в years");
        var reports = getFirstMonthReporstForNewYear(
          dateTo,
          fullPeriod,
          reportId
        );

        var months = getMonthsForNewYear(reports);

        years.push({ year: periodEndYear, months });
        return years;
      } else {
        console.log("следующий год есть и меняем все по порядку");

        var yearIndex = getYearIndex(years, periodEndYear);
        var months = getMonthsFromYear(years, yearIndex);

        years[yearIndex] = updateYearStructure(
          months,
          periodEndYear,
          periodEndMonth,
          dateTo,
          reportId,
          fullPeriod
        );
        return years;
      }
    }

    console.log(
      "здесь переход на следующий месяц не нужен(а значит и на следующий год), работаем с существующим годом"
    );
    var yearIndex = getYearIndex(years, periodStartYear);
    var months = getMonthsFromYear(years, yearIndex);

    years[yearIndex] = updateYearStructure(
      months,
      periodStartYear,
      periodStartMonth,
      dateFrom,
      reportId,
      fullPeriod
    );
    return years;
  }

  if (isNextMonthReportNeeded(dateFrom, dateTo)) {
    console.log("года совпадают, нужен переход на следующий  месяц");

    var yearIndex = getYearIndex(years, periodStartYear);
    var months = getMonthsFromYear(years, yearIndex);

    years[yearIndex] = updateYearStructure(
      months,
      periodStartYear,
      periodEndMonth,
      dateTo,
      reportId,
      fullPeriod,
      "carry"
    );

    return years;
  }

  console.log("года совпадают, перехода на следующий месяц нет");

  var yearIndex = getYearIndex(years, periodStartYear);
  var months = getMonthsFromYear(years, yearIndex);

  years[yearIndex] = updateYearStructure(
    months,
    periodStartYear,
    periodStartMonth,
    dateFrom,
    reportId,
    fullPeriod
  );

  return years;
};

module.exports = organizeReportsByPeriod;
