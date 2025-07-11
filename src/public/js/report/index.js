import createReportTable from "./row/createReportTable.js";
import createTotalsTable from "./row/createTotalsTable.js";
import getReportInfo from "./row/services/getReportInfo.js";
import downloadReportAsXLSX from "./downloadReportAsXLSX.js";
import getCookieByName from "../index/services/getCookieByName.js";
import injectBase64IntoImgTags from "./row/services/injectBase64IntoImgTags.js";

var userId = await getCookieByName("userId");

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
  var { report, imageCollection } = await getReportData();

  await getReportInfo(report);
  await createReportTable(report);
  await injectBase64IntoImgTags(imageCollection);
  await createTotalsTable(report);

  await downloadReportAsXLSX(report);
};

showReport();
