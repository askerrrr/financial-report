import createSKUsTable from "./createSKUsTable.js";
import createTotalsTable from "./createTotalsTable.js";
import downloadReportAsXLSXButtonHandler from "../report/downloadReportAsXLSXButtonHandler.js";

var isGuestAccess = true;
var downloadReportLink = "/decode-report-without-registration/xlsx/";

var showReport = (report) => {
  var startYear = +report.dateFrom.split("-")[0];

  createSKUsTable(report, startYear);
  createTotalsTable(report);
  downloadReportAsXLSXButtonHandler(report, downloadReportLink, isGuestAccess);

  document.getElementById("skus-table").style.display = "block";
  document.getElementById("totals-table").style.display = "block";
  document.getElementById("download-report-as-xlsx-button").style.display = "block";

  window.scrollTo({ top: 900, behavior: "smooth" });
};

export default showReport;
