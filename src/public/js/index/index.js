import getCookieByName from "./services/getCookieByName.js";
import createRowForReports from "./row/createRowForReports.js";

var userId = await getCookieByName("userId");

var getReportsData = async () => await fetch("/api/" + userId);

var showReportsTable = async () => {
  var res = await getReportsData();

  var data = await res.json();

  var { reports } = data;

  return await createRowForReports(reports);
};

showReportsTable();
