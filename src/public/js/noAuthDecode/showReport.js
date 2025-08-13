import createReportTable from "./createReportTable.js";
import createTotalsTable from "./createTotalsTable.js";

var getReport = async (id) => {
  var url = "/no-auth-decode/api/report/" + id;

  var res = await fetch(url);

  var data = await res.json();

  if (!res.ok) {
    alert(data.msg);
    return;
  }

  return data;
};

var showReport = async () => {
  var id = window.location.pathname.split("/")[3];

  var { report, setCostPriceUrl } = await getReport(id);

  await createReportTable(id, report, setCostPriceUrl);
  await createTotalsTable(report);
};

showReport();
