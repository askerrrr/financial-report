import createSKUsTable from "./createSKUsTable.js";
import createTotalsTable from "./createTotalsTable.js";
import downloadReportAsXLSXButtonHandler from "../report/downloadReportAsXLSXButtonHandler.js";

var showReport = async (data) => {
  var { id, report, setCostPriceLink, downloadReportLink } = data;

  await createSKUsTable(id, report, setCostPriceLink);
  await createTotalsTable(report);
  await downloadReportAsXLSXButtonHandler(report, downloadReportLink);

  document.getElementById("skus-table").style.display = "block";
  document.getElementById("totals-table").style.display = "block";
  document.getElementById("download-report-as-xlsx-button").style.display = "block";

  window.scrollTo({ top: 900, behavior: "smooth" });
};

export default showReport;
