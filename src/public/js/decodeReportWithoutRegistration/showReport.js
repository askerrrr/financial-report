import createSKUsTable from "./createSKUsTable.js";
import createTotalsTable from "./createTotalsTable.js";
import downloadReportAsXLSXButtonHandler from "../report/downloadReportAsXLSXButtonHandler.js";

var showReport = ({ userId, report, downloadReportLink }, isGuestAccess) => {
  createSKUsTable(report);
  createTotalsTable(report);
  downloadReportAsXLSXButtonHandler(report, downloadReportLink, isGuestAccess);

  document.getElementById("skus-table").style.display = "block";
  document.getElementById("totals-table").style.display = "block";
  document.getElementById("download-report-as-xlsx-button").style.display = "block";

  window.scrollTo({ top: 900, behavior: "smooth" });
};

export default showReport;
