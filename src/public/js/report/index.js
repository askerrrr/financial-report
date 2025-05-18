import createRowForReport from "./row/createRowForReport.js";

var userId = document.cookie.split("=")[1];

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

var showReport = async () => {};
