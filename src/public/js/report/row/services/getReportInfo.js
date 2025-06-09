var getReportInfo = async (dateFrom, dateTo) => {
  var div = document.createElement("div");
  div.id = "report-info";

  var reportInfo = `Отчет от ${dateFrom} до ${dateTo}`;

  div.append(reportInfo);

  document.body.appendChild(div);
};

export default getReportInfo;
