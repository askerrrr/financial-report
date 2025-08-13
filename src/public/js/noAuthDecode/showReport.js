import createReportTable from "./createReportTable.js";

var getReport = async (id) => {
  var url = "/no-auth-decode/api/report/" + id;

  var res = await fetch(url);

  var data = await res.json();

  if (!res.ok) {
    alert(data.msg);
    return;
  }

  return data.report;
};

var showReport = async () => {
  var id = window.location.pathname.split("/")[3];

  var report = await getReport(id);

  await createReportTable(report);
};

showReport();
