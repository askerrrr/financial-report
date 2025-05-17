var getReportPeriod = async (period) => {
  var td = document.createElement("td");

  td.append(period);

  return td;
};

export default getReportPeriod;
