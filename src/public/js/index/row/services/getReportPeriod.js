var getReportPeriod = async (dateFrom, dateTo) => {
  var td = document.createElement("td");

  var dateFromDiv = document.createElement("div");
  var dateToDiv = document.createElement("div");

  dateFromDiv.append("с ", dateFrom);
  dateToDiv.append("по ", dateTo);

  var br = document.createElement("br");

  td.append(dateFromDiv, br, dateToDiv);

  return td;
};

export default getReportPeriod;
