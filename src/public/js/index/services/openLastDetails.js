var getLastMonthName = (year) => year.find((month) => month !== null).month; //[0];

var openLastDetails = async (years) => {
  var lastYearData = years[0];

  var { year, months } = lastYearData;

  var lastMonthName = getLastMonthName(months);

  var lastMonthDetailsId = `reports_container_${year}_${lastMonthName}`;
  var lastMonthDetails = document.getElementById(lastMonthDetailsId);

  var lastYearDetailsId = year;
  var lastYearDetails = document.getElementById(lastYearDetailsId);

  lastYearDetails.open = true;
  lastMonthDetails.open = true;
};

export default openLastDetails;
