var getReportPeriod = async (dateFrom, dateTo) => {
  var td = document.createElement("td");

  var period = "с " + dateFrom + " по " + dateTo;

  td.append(period);

  return td;
};

export default getReportPeriod;
