import insertDataToTable from "./insertDataToTable.js";
import isReportNotInTree from "./isReportNotInTree..js";
import sendAbandonedReports from "./sendAbandonedReports.js";
import getReportLoadingState from "./getReportLoadingState.js";
import insertNewReportToTree from "../services/reportTreeBuilder/insertNewReportToTree/index.js";
import { disableParentReportLoadingStatePanel } from "./toggleVisibilityOfParentReportLoadingStatePanel.js";

var FIRST_REQUEST_DELAY_MS = 5_000;
var NEXT_REQUEST_DELAY_MS = 30_000;
var nextRequestDelay = async (isFirstRequest) =>
  new Promise((res) => (isFirstRequest ? setTimeout(res, FIRST_REQUEST_DELAY_MS) : setTimeout(res, NEXT_REQUEST_DELAY_MS)));

var reportsQueueTbodyId = "reports-queue-tbody";
var abandonedReportsTbodyId = "abandoned-reports-tbody";
var retryAbandonedReportsLoadingMsg = "Повторить загрузку отчётов, которые не удалось загрузить";

var refreshReportLoadingStateStatus = async (userId) => {
  var isFirstRequest = true;
  var reportsQueueTbody = document.getElementById(reportsQueueTbodyId);
  var abandonedReportsTbody = document.getElementById(abandonedReportsTbodyId);

  while (true) {
    await nextRequestDelay(isFirstRequest);
    isFirstRequest = false;

    var { reportsQueue, abandonedReports, loadingInProgress, lastLoadedReport } = await getReportLoadingState(userId);

    console.log({ loadingInProgress });

    resetReportsQueueTable();
    resetAbandonedReportsTable();

    insertDataToTable(reportsQueue, reportsQueueTbodyId);
    insertDataToTable(abandonedReports, abandonedReportsTbodyId);

    if (isReportNotInTree(lastLoadedReport.reportId)) {
      insertNewReportToTree(lastLoadedReport);
    }

    if (!loadingInProgress) {
      if (hasAbandonedReports()) {
        var needToResumeLoading = confirm(retryAbandonedReportsLoadingMsg);

        console.log({ abandonedReports });

        var success = await sendAbandonedReports(userId, abandonedReports, needToResumeLoading);
        console.log({ success, needToResumeLoading });
        if (success) {
          if (!needToResumeLoading) {
            resetReportsQueueTable();
            resetAbandonedReportsTable();
            disableParentReportLoadingStatePanel();
            break;
          } else {
            resetAbandonedReportsTable();
            insertDataToTable(abandonedReports, reportsQueueTbodyId);
          }
        } else {
          var errMsg;

          if (needToResumeLoading) {
            errMsg = "Произошла ошибка при попытке загрузить отчёты. Попробуйте еще раз.";
          } else {
            errMsg = "Произошла ошибка при попытке избавиться от незагруженных отчётов. Попробуйте еще раз.";
          }

          alert(errMsg);
        }
      } else {
        disableParentReportLoadingStatePanel();
        break;
      }
    }
  }

  function hasAbandonedReports() {
    return abandonedReportsTbody.hasChildNodes();
  }

  function resetAbandonedReportsTable() {
    abandonedReportsTbody.innerHTML = "";
  }

  function resetReportsQueueTable() {
    reportsQueueTbody.innerHTML = "";
  }
};

export default refreshReportLoadingStateStatus;
