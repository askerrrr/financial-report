import insertDataToTable from "./insertDataToTable.js";
import getReportLoadingState from "./getReportLoadingState.js";
import showReportLoadingStatePanel from "./showReportLoadingStatePanel.js";
import refreshReportLoadingStateStatus from "./refreshReportLoadingStateStatus.js";
import { enableParentReportLoadingStatePanel } from "./toggleVisibilityOfParentReportLoadingStatePanel.js";

var builderWasCalled = false;

var reportLoadingStatePanelBuilder = async (userId, reportLoadingState, isMainPageLoad) => {
  console.log('on top',{ builderWasCalled })

  if(!builderWasCalled) {
      builderWasCalled = true;
      console.log('on top in if',{ builderWasCalled })

      if (!isMainPageLoad) {
         reportLoadingState = await getReportLoadingState(userId);
      }

  var { reportsQueue, abandonedReports, loadingInProgress, isReportLoadingDelayed } = reportLoadingState;

  if (loadingInProgress || isReportLoadingDelayed) {
    enableParentReportLoadingStatePanel();
    await showReportLoadingStatePanel();

    var reportsQueueTbodyId = "reports-queue-tbody";
    var abandonedReportsTbodyId = "abandoned-reports-tbody";

    insertDataToTable(reportsQueue, reportsQueueTbodyId);
    insertDataToTable(abandonedReports, abandonedReportsTbodyId);
    console.log('before',{ builderWasCalled })
    var loadingCompleted =  await refreshReportLoadingStateStatus(userId);

    if (loadingCompleted) {
      builderWasCalled = false;
    }

    console.log('after',{ builderWasCalled })

    } 

    builderWasCalled = false;  
    console.log('on end in if',{ builderWasCalled })
  }

  console.log('on end',{ builderWasCalled })
};

export default reportLoadingStatePanelBuilder;
