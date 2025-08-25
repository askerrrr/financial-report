var getReportInfo = async ({ dateFrom, dateTo }) => {
  var div = document.createElement("div");
  div.id = "report-info";

  dateFrom = dateFrom.split("-").join(".");
  dateTo = dateTo.split("-").join(".");

  var reportInfo = `Отчет от ${dateFrom} до ${dateTo}`;

  div.append(reportInfo);

  document.body.appendChild(div);
};

export default getReportInfo;
