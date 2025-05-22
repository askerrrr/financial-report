import getCookieByName from "../index/services/getCookieByName.js";
import createRowForReport from "./row/createRowForReport.js";

var userId = await getCookieByName("userId");

var reportId = await getCookieByName("reportId");

var url = "/reports/" + userId + "/" + reportId;

var getReportData = async () => {
  var res = await fetch(url);

  if (!res.ok) {
    return alert("Ошибка при получении отчета");
  }

  var data = await res.json();

  return data.report;
};

var showReport = async () => {
  var report = await getReportData();

  await createRowForReport(report);
};

showReport();
