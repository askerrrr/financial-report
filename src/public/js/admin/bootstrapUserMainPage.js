import getMainPageData from "../index/utils/getMainPageData.js";
import { createReportTree } from "../index/reportTreeBuilder/index.js";
import accountedFinancesPanelHandler from "../index/accountedFinancesPanel/index.js";
import reportLoaderModalWindowHandler from "../index/reportLoaderModalWindow/index.js";
import reportLoadingStatePanelBuilder from "../index/reportLoadingStatePanel/index.js";
import reportFileUploadModalWindow from "../index/reportFileUploadModalWindow/index.js";

var isMainPageLoad = true;

var userId = window.location.pathname.split("/").at(-1);

var bootstrapUserMainPage = async () => {
  var { lastReports, reportTree, reportLoadingState, reportsWithAccountedFinances } = await getMainPageData(userId);

  updateLinks(userId);
  createReportTree(userId, lastReports, reportTree);
  accountedFinancesPanelHandler(reportsWithAccountedFinances);
};

bootstrapUserMainPage();

var btnToUserGoodsPage = document.getElementById("goods-page-link");
var btnToUserWbTokenPage = document.getElementById("wb-token-page-link");
var btnToUserTaxParamsPage = document.getElementById("tax-params-page-link");

function updateLinks(userId) {
  btnToUserGoodsPage.onclick = () => (window.location.href = "/admin/user/goods/" + userId);
  btnToUserWbTokenPage.onclick = () => (window.location.href = "/admin/user/wbtoken/" + userId);
  btnToUserTaxParamsPage.onclick = () => (window.location.href = "/admin/user/tax-params/" + userId);
}
