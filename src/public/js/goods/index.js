import reportFileUploadFormHandler from "./reportFileUploadFormHandler.js";
import showListGoodsTable from "./showListGoodsTable.js";
import downloadSkusMetricsFileButtonHandler from "./downloadSkusMetricsFileButtonHandler.js";
import downloadWeeklyPricesFileButtonHandler from "./downloadWeeklyPricesFileButtonHandler.js";

var userId = document.cookie.split("=")[1];

showListGoodsTable();
reportFileUploadFormHandler(userId);
downloadSkusMetricsFileButtonHandler(userId);
downloadWeeklyPricesFileButtonHandler(userId);
