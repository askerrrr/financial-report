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

var organizeReportsByPeriod = async (dateFrom, dateTo, reportId, years) => {
  var [periodStartYear, periodStartMonth] = dateFrom.split("-");
  var fullPeriod = `${dateFrom} ${dateTo}`;

  var [periodEndYear, periodEndMonth] = dateTo.split("-");

  var yearIsExist = await checkYearIsExists(years, periodStartYear);

  if (!yearIsExist) {
    var isSingleYearReport = await compareYears(periodStartYear, periodEndYear);

    if (!isSingleYearReport) {
      if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
        var periodEndYearIsExist = await checkYearIsExists(
          years,
          periodEndYear
        );

        if (periodEndYearIsExist) {
          var periodEndYearIndex = await getYearIndex(years, periodEndYear);
          var { months } = years[periodEndYearIndex];

          var { month, reportIds } = await getNextYearFirstMonth(months);

          reportIds = await setReportIdInReports(
            dateTo,
            reportIds,
            reportId,
            fullPeriod,
            "carry"
          );

          months[0] = { month, reportIds };

          years[periodEndYearIndex] = { year: periodEndYear, months };

          return years;
        } else {
          console.log("следующего года нет в списке");

          var reportIds = await getFirstMonthReporstForNewYear(
            dateTo,
            fullPeriod,
            reportId
          );

          var months = await getMonthsForNewYear(reportIds);

          years.push({ year: periodEndYear, months });

          return years;
        }
      }

      var months = await getMonthsData(reportId, dateFrom);
      years.push({ year: periodStartYear, months });
      return years;
    }

    if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
      var months = await getMonthsData(reportId, fullPeriod, dateTo, "carry");

      years.push({ year: periodStartYear, months });

      return years;
    }

    var months = await getMonthsData(reportId, fullPeriod, dateFrom);

    years.push({ year: periodStartYear, months });

    return years;
  }

  var isSingleYearReport = await compareYears(periodStartYear, periodEndYear);

  if (!isSingleYearReport) {
    if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
      var nextYearIsExist = await checkYearIsExists(years, periodEndYear);

      if (!nextYearIsExist) {
        var reportIds = await getFirstMonthReporstForNewYear(
          dateTo,
          fullPeriod,
          reportId
        );

        var months = await getMonthsForNewYear(reportIds);

        years.push({ year: periodEndYear, months });
        return years;
      } else {
        var yearIndex = await getYearIndex(years, periodEndYear);
        var months = await getMonthsFromYear(years, yearIndex);

        years[yearIndex] = await updateYearStructure(
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

    var yearIndex = await getYearIndex(years, periodStartYear);
    var months = await getMonthsFromYear(years, yearIndex);

    years[yearIndex] = await updateYearStructure(
      months,
      periodStartYear,
      periodStartMonth,
      dateFrom,
      reportId,
      fullPeriod
    );
    return years;
  }

  if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
    var yearIndex = await getYearIndex(years, periodStartYear);
    var months = await getMonthsFromYear(years, yearIndex);

    years[yearIndex] = await updateYearStructure(
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

  var yearIndex = await getYearIndex(years, periodStartYear);
  var months = await getMonthsFromYear(years, yearIndex);

  years[yearIndex] = await updateYearStructure(
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
