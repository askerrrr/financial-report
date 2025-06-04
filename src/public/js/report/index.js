import getCookieByName from "../index/services/getCookieByName.js";
import createRowForReport from "./row/createRowForReport.js";
import createTotalsTable from "./row/createTotalsTable.js";

var userId = await getCookieByName("userId");

var pathParts = window.location.pathname.split("/");

var reportId = pathParts.at(-1);

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
  await createTotalsTable(report);
};

showReport();
