import insertDataToTable from "./insertDataToTable.js";
import isReportNotInTree from "./isReportNotInTree..js";
import sendAbandonedReports from "./sendAbandonedReports.js";
import getReportLoadingState from "./getReportLoadingState.js";
import insertNewReportToTree from "../services/reportTreeBuilder/insertNewReportToTree/index.js";
import { disableParentReportLoadingStatePanel } from "./toggleVisibilityOfParentReportLoadingStatePanel.js";

var NEXT_REQUEST_DELAY_MS = 30_000;
var nextRequestDelay = async () => new Promise((res) => setTimeout(res, NEXT_REQUEST_DELAY_MS));

var reportsQueueTbodyId = "reports-queue-tbody";
var abandonedReportsTbodyId = "abandoned-reports-tbody";
var retryAbandonedReportsLoadingMsg = "Повторить загрузку отчётов, которые не удалось загрузить";

var refreshReportLoadingStateStatus = async (userId) => {
  var reportsQueueTbody = document.getElementById(reportsQueueTbodyId);
  var abandonedReportsTbody = document.getElementById(abandonedReportsTbodyId);

  while (true) {
    await nextRequestDelay();

    var { reportsQueue, abandonedReports, loadingInProgress, lastLoadedReport } = await getReportLoadingState(userId);

    console.log({ loadingInProgress });

    resetReportsQueueTables();
    resetAbandonedReportsTables();

    insertDataToTable(reportsQueue, reportsQueueTbodyId);
    insertDataToTable(abandonedReports, abandonedReportsTbodyId);

    if (isReportNotInTree(lastLoadedReport.dateFrom)) {
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
            resetReportsQueueTables();
            resetAbandonedReportsTables();
            disableParentReportLoadingStatePanel();
            break;
          } else {
            resetAbandonedReportsTables();
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

  function resetAbandonedReportsTables() {
    abandonedReportsTbody.innerHTML = "";
  }

  function resetReportsQueueTables() {
    reportsQueueTbody.innerHTML = "";
  }
};

export default refreshReportLoadingStateStatus;
