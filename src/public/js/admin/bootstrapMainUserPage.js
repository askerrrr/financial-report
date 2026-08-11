import logoutButtonHandler from "../index/logout/index.js";
import getMainPageData from "../index/utils/getMainPageData.js";
import { createReportTree } from "../index/reportTreeBuilder/index.js";
import accountedFinancesPanelHandler from "../index/accountedFinancesPanel/index.js";
import reportLoaderModalWindowHandler from "../index/reportLoaderModalWindow/index.js";
import reportLoadingStatePanelBuilder from "../index/reportLoadingStatePanel/index.js";
import reportFileUploadModalWindow from "../index/reportFileUploadModalWindow/index.js";

var isMainPageLoad = true;

var userId = window.location.pathname.split("/").at(-1);

var bootstrapMainUserPage = async () => {
  var { lastReports, reportTree, reportLoadingState, reportsWithAccountedFinances } = await getMainPageData(userId);

  createReportTree(userId, lastReports, reportTree);

  reportLoaderModalWindowHandler(userId);

  reportLoadingStatePanelBuilder(userId, reportLoadingState, isMainPageLoad);
  accountedFinancesPanelHandler(reportsWithAccountedFinances);
  logoutButtonHandler(userId);

  reportFileUploadModalWindow(userId);
};

bootstrapMainUserPage();
