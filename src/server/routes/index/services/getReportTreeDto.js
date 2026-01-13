var getReportTreeDto = async (years) =>
  years
    .map(({ year, months }) => {
      return {
        year,
        months: months
          .filter((item) => item?.month && !item?.reportIds.every((item) => item === null))
          .map(({ month, reportIds }) => {
            return { month, reportIds: reportIds.filter((report) => report) };
          }),
      };
    })
    .filter((year) => year.months.length);

module.exports = getReportTreeDto;
