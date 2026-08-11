import fileUploadHandler from "../goods/fileUploadHandler.js";
import showListGoodsTable from "../goods/showListGoodsTable.js";
import downloadSkusMetricsFileButtonHandler from "../goods/downloadSkusMetricsFileButtonHandler.js";
import downloadWeeklyPricesFileButtonHandler from "../goods/downloadWeeklyPricesFileButtonHandler.js";

var userId = window.location.pathname.split("/").at(-1);
var btnBackToMainPage = document.getElementById("back-to-main-page-btn");

var bootstrapUserGoodsPage = async () => {
  showListGoodsTable();
  fileUploadHandler(userId);
  downloadSkusMetricsFileButtonHandler(userId);
  downloadWeeklyPricesFileButtonHandler(userId);

  btnBackToMainPage.onclick = () => (window.location.href = "/admin/user/" + userId);
};

bootstrapUserGoodsPage();
