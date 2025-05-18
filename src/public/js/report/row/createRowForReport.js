var userId = document.cookie.split("=")[1];

var pathParts = window.location.pathname.split("/");

var reportId = pathParts.at(-1);

var url = "/reports/" + userId + "/" + reportId;

var getReportData = async () => await fetch(url);

var createRowForReport = async (report) => {};
