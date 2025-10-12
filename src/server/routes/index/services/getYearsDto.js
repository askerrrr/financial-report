var getYearsDto = async (years) =>
  years.map(({ year, months }) => {
    return {
      year,
      months: months
        .filter((item) => item?.month)
        .map(({ month, reportIds }) => {
          return { month, reportIds: reportIds.filter((report) => report) };
        }),
    };
  });

module.exports = getYearsDto;
