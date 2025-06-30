import getCookieByName from "./services/getCookieByName.js";
import createReportsTable from "./row/createReportsTable.js";
import createPeriodDetails from "./details/createReportDetails.js";

var userId = await getCookieByName("userId");

var getReportsData = async () => await fetch("/api/" + userId);

var showReportsTable = async () => {
  var res = await getReportsData();

  var data = await res.json();

  var { reports, years } = data;

  await createPeriodDetails(years);

  var table = await createReportsTable(reports);

  document.body.append(table);
};

showReportsTable();
