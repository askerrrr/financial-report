import createReportTable from "./createReportTable.js";

var getReport = async (id) => {
  var url = "/no-auth-decode/report/" + id;

  var res = await fetch(url);

  var { report } = await res.json();

  return report;
};

var showReport = async () => {
  var id = window.location.pathname.split("/")[3];

  var report = await getReport(id);

  await createReportTable(report);
};

showReport();
