import reportInfo from "./reportInfo.js";
import createSKUsTable from "./table/createSKUsTable.js";
import createTotalsTable from "./table/createTotalsTable.js";
import deleteReportHandler from "./deleteReportHandler.js";
import splitReportByYear from "./table/services/splitReportByYear.js";
import injectBase64IntoImgTags from "./table/services/injectBase64IntoImgTags.js";
import downloadReportAsXLSXButtonHandler from "./downloadReportAsXLSXButtonHandler.js";
import getReportPeriodText from "../index/accountedFinancesPanel/getReportPeriodText.js";
import setSkusLastCostPricesButtonHandler from "./setSkusLastCostPricesButtonHandler.js";
import financialAccountingStatusButtonHander from "./financialAccountingStatusButtonHander.js";

var currentYearPostfix = "InCurrentYear";
var nextYearPostfix = "InNextYear";
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
  var { reportId, dateFrom, dateTo, recordedTo, skus, isCrossYearPeriod } = report;

  if (isCrossYearPeriod) {
    var startYear = dateFrom.split("-")[0];
    var endYear = dateTo.split("-")[0];

    var fullPeriod = startYear + "-" + endYear;
    var fullReportPeriodText = getReportPeriodText(dateFrom, dateTo).reportPeriodText;
    createTotalsTable(report, fullPeriod, isCrossYearPeriod, fullReportPeriodText);

    var { startYearReportData, endYearReportData } = splitReportByYear(report);

    var startReportPeriodText = getReportPeriodText(dateFrom, dateTo, dateFrom).reportPeriodText;
    createTotalsTable(startYearReportData, startYear, isCrossYearPeriod, startReportPeriodText);
    createSKUsTable(startYearReportData, currentYearPostfix, startYear);

    var endReportPeriodText = getReportPeriodText(dateFrom, dateTo, dateTo).reportPeriodText;
    createTotalsTable(endYearReportData, endYear, isCrossYearPeriod, endReportPeriodText);
    createSKUsTable(endYearReportData, nextYearPostfix, endYear);
  } else {
    var postfixStub = "";
    var { year } = recordedTo;

    createTotalsTable(report, year, isCrossYearPeriod);
    createSKUsTable(report, postfixStub, year);

    setSkusLastCostPricesButtonHandler(skus, reportId, year, skusLastCostPrice);
  }

  reportInfo(report);

  injectBase64IntoImgTags(skuImages);

  downloadReportAsXLSXButtonHandler(report);
  deleteReportHandler(userId, reportId, skus);

  var isFinancesAccountingEditable = skus.find((sku) => sku.isCostPriceSet);

  if (isFinancesAccountingEditable) {
    financialAccountingStatusButtonHander(userId, reportId);
  }
};

main();
