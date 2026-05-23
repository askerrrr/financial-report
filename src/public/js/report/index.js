import reportInfo from "./reportInfo.js";
import createSKUsTable from "./table/createSKUsTable.js";
import createTotalsTable from "./table/createTotalsTable.js";
import deleteReportHandler from "./deleteReportHandler.js";
import injectBase64IntoImgTags from "./table/services/injectBase64IntoImgTags.js";
import downloadReportAsXLSXButtonHandler from "./downloadReportAsXLSXButtonHandler.js";
import setSkusLastCostPricesButtonHandler from "./setSkusLastCostPricesButtonHandler.js";
import financialAccountingStatusButtonHander from "./financialAccountingStatusButtonHander.js";

var userId = document.cookie.split("=")[1];

var pathParts = window.location.pathname.split("/");

var reportId = pathParts.at(-1);

var url = "/report/" + userId + "/" + reportId;

var getReportData = async () => {
  var res = await fetch(url);

  if (!res.ok) {
    alert("Ошибка при получении отчета");
    window.location.href = "/";
  }

  var data = await res.json();

  return data;
};

var main = async () => {
  var { report, skuImages, skusLastCostPrice } = await getReportData();
  var { reportId, recordedTo } = report;

  reportInfo(report);
  createSKUsTable(report);
  createTotalsTable(report);
  injectBase64IntoImgTags(skuImages);

  downloadReportAsXLSXButtonHandler(report);
  deleteReportHandler(userId, reportId, skusLastCostPrice);

  financialAccountingStatusButtonHander(reportId);
  setSkusLastCostPricesButtonHandler(reportId, recordedTo.year, skusLastCostPrice);
};

main();
