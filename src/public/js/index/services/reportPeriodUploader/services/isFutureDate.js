var isFutureDate = async (reportDate) => {
  var today = new Date().toLocaleDateString();

  var [year, month, day] = reportDate.split("-");

  var validDate = [day, month, year].join(".");

  var validDateMilliseconds = new Date(validDate).getTime();

  if (isNaN(validDateMilliseconds)) {
    return true;
  }

  var todayMilliseconds = new Date(today).getTime();

  return validDateMilliseconds > todayMilliseconds;
};

export default isFutureDate;
