import deleteReport from "./row/deleteReport.js";
import createReportTable from "./row/createReportTable.js";
import createTotalsTable from "./row/createTotalsTable.js";
import getReportInfo from "./row/services/getReportInfo.js";
import downloadReportAsXLSX from "./downloadReportAsXLSX.js";
import getCookieValueByName from "../index/services/getCookieValueByName.js";
import injectBase64IntoImgTags from "./row/services/injectBase64IntoImgTags.js";

var userId = await getCookieValueByName("userId");

var pathParts = window.location.pathname.split("/");

var reportId = pathParts.at(-1);

var url = "/reports/" + userId + "/" + reportId;

var getReportData = async () => {
  var res = await fetch(url);

  if (!res.ok) {
    return alert("Ошибка при получении отчета");
  }

  var data = await res.json();

  return data;
};

var showReport = async () => {
  var { report, imageCollection, downloadReportLink } = await getReportData();

  await getReportInfo(report);
  await createReportTable(report);
  await injectBase64IntoImgTags(imageCollection);
  await createTotalsTable(report);

  await downloadReportAsXLSX(report, downloadReportLink);
  await deleteReport(report);
};

showReport();
