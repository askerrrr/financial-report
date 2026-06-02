import buildReportTree from "./buildReportTree.js";
import fileUploadHandler from "./fileUploadHandler.js";
import getReportsData from "./services/getReportsData.js";
import reportLoaderHandler from "./reportLoaderHandler.js";

var main = async () => {
  var { lastReports, reportTree, reportLoadingState } = await getReportsData();

  buildReportTree(lastReports, reportTree);

  reportLoaderHandler();
};

main();
