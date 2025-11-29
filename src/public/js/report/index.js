import reportInfo from "./reportInfo.js";
import createSKUsTable from "./table/createSKUsTable.js";
import createTotalsTable from "./table/createTotalsTable.js";
import deleteReportHandler from "./table/deleteReportHandler.js";
import injectBase64IntoImgTags from "./table/services/injectBase64IntoImgTags.js";
import downloadReportAsXLSXButtonHandler from "./downloadReportAsXLSXButtonHandler.js";
import setSkusLastCostPricesButtonHandler from "./setSkusLastCostPricesButtonHandler.js";

var userId = document.cookie.split("=")[1];

var pathParts = window.location.pathname.split("/");

var reportId = pathParts.at(-1);

var url = "/reports/" + userId + "/" + reportId;

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
  var { report, skuImages, skusLastCostPrice, downloadReportLink } = await getReportData();

  reportInfo(report);
  await createSKUsTable(report);
  await injectBase64IntoImgTags(skuImages);
  await createTotalsTable(report);

  await deleteReportHandler(report);
  await downloadReportAsXLSXButtonHandler(report, downloadReportLink);

  var { reportId, recordTo } = report;

  setSkusLastCostPricesButtonHandler(reportId, recordTo.year, skusLastCostPrice);
};

main();
