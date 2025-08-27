import createSKUsTable from "./table/createSKUsTable.js";
import createTotalsTable from "./table/createTotalsTable.js";
import getReportInfo from "./table/services/getReportInfo.js";
import deleteReportHandler from "./table/deleteReportHandler.js";
import getCookieValueByName from "../index/services/getCookieValueByName.js";
import injectBase64IntoImgTags from "./table/services/injectBase64IntoImgTags.js";
import downloadReportAsXLSXButtonHandler from "./downloadReportAsXLSXButtonHandler.js";

var userId = await getCookieValueByName("userId");

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
  var { report, imageCollection, downloadReportLink } = await getReportData();

  await getReportInfo(report);
  await createSKUsTable(report);
  await injectBase64IntoImgTags(imageCollection);
  await createTotalsTable(report);

  await deleteReportHandler(report);
  await downloadReportAsXLSXButtonHandler(report, downloadReportLink);
};

main();
