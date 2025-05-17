import createRowForReports from "./row/createRowForReports.js";

var userId = document.cookie.split("=")[1];

var getReportsData = async () => await fetch("/api/" + userId);

var showReportsTable = async () => {
  var res = await getReportsData();

  var data = await res.json();

  var { reports } = data;
};

showReportsTable();
