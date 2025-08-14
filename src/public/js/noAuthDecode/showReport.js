import createSKUsTable from "./createSKUsTable.js";
import createTotalsTable from "./createTotalsTable.js";
import downloadReportAsXLSX from "../report/downloadReportAsXLSX.js";

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

  var { report, setCostPriceLink, downloadReportLink } = await getReport(id);

  await createSKUsTable(id, report, setCostPriceLink);
  await createTotalsTable(report);
  await downloadReportAsXLSX(report, downloadReportLink);
};

showReport();
