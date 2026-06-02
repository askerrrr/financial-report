import buildReportTree from "./buildReportTree.js";
import fileUploadHandler from "./fileUploadHandler.js";
import getMainPageData from "./services/getMainPageData.js";
import reportLoaderHandler from "./reportLoaderHandler.js";
import reportLoadingStatePanelBuilder from "./reportLoadingStatePanel/index.js";

var userId = document.cookie.split("=")[1];

var main = async () => {
  var { lastReports, reportTree, reportLoadingState } = await getMainPageData(userId);

  buildReportTree(userId, lastReports, reportTree);

  reportLoaderHandler(userId);

  reportLoadingStatePanelBuilder(reportLoadingState);
};

main();
