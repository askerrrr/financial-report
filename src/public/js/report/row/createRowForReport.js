var userId = document.cookie.split("=")[1];

var pathParts = window.location.pathname.split("/");

var reportId = pathParts.at(-1);

var getReportData = async (id) => await fetch();

var createRowForReport = async (report) => {};
