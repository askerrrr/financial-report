var {
  getYearIndex,
  compareYears,
  checkYearExists,
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
  var [startYear, startMonth] = dateFrom.split("-");
  var [endYear, endMonth] = dateTo.split("-");

  var fullPeriod = `${dateFrom} ${dateTo}`;

  var yearIsExist = await checkYearExists(years, startYear);

  if (!yearIsExist) {
    var isSingleYearReport = await compareYears(startYear, endYear);

    if (!isSingleYearReport) {
      if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
        var endYearIsExist = await checkYearExists(years, endYear);

        if (endYearIsExist) {
          var endYearIndex = await getYearIndex(years, endYear);
          var { months } = years[endYearIndex];

          var { month, reportIds } = await getNextYearFirstMonth(months);

          reportIds = await setReportIdInReports(
            dateTo,
            reportIds,
            reportId,
            fullPeriod,
            "carry"
          );

          months[0] = { month, reportIds };

          years[endYearIndex] = { year: endYear, months };

          return { years, year: endYear };
        } else {
          var reportIds = await getFirstMonthReporstForNewYear(
            dateTo,
            fullPeriod,
            reportId
          );

          var months = await getMonthsForNewYear(reportIds);

          years.push({ year: endYear, months });

          return { years, year: endYear };
        }
      }

      var months = await getMonthsData(reportId, dateFrom);
      years.push({ year: startYear, months });

      return { years, year: startYear };
    }

    if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
      var months = await getMonthsData(reportId, fullPeriod, dateTo, "carry");

      years.push({ year: startYear, months });

      return { years, year: startYear };
    }

    var months = await getMonthsData(reportId, fullPeriod, dateFrom);

    years.push({ year: startYear, months });

    return { years, year: startYear };
  }

  var isSingleYearReport = await compareYears(startYear, endYear);

  if (!isSingleYearReport) {
    if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
      var nextYearIsExist = await checkYearExists(years, endYear);

      if (!nextYearIsExist) {
        var reportIds = await getFirstMonthReporstForNewYear(
          dateTo,
          fullPeriod,
          reportId
        );

        var months = await getMonthsForNewYear(reportIds);

        years.push({ year: endYear, months });

        return { years, year: endYear };
      } else {
        var yearIndex = await getYearIndex(years, endYear);
        var months = await getMonthsFromYear(years, yearIndex);

        years[yearIndex] = await updateYearStructure(
          months,
          endYear,
          endMonth,
          dateTo,
          reportId,
          fullPeriod
        );

        return { years, year: endYear };
      }
    }

    var yearIndex = await getYearIndex(years, startYear);
    var months = await getMonthsFromYear(years, yearIndex);

    years[yearIndex] = await updateYearStructure(
      months,
      startYear,
      startMonth,
      dateFrom,
      reportId,
      fullPeriod
    );

    return { years, year: startYear };
  }

  if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
    var yearIndex = await getYearIndex(years, startYear);
    var months = await getMonthsFromYear(years, yearIndex);

    years[yearIndex] = await updateYearStructure(
      months,
      startYear,
      endMonth,
      dateTo,
      reportId,
      fullPeriod,
      "carry"
    );

    return { years, year: startYear };
  }

  var yearIndex = await getYearIndex(years, startYear);
  var months = await getMonthsFromYear(years, yearIndex);

  years[yearIndex] = await updateYearStructure(
    months,
    startYear,
    startMonth,
    dateFrom,
    reportId,
    fullPeriod
  );

  return { years, year: startYear };
};

module.exports = organizeReportsByPeriod;
