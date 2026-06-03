import insertDataToTable from "./insertDataToTable.js";

var NEXT_REQUEST_DELAY_MS = 90_000;
var nextRequestDelay = async () => new Promise((res) => setTimeout(res, NEXT_REQUEST_DELAY_MS));

var reportsQueueTbodyId = "reports-queue-tbody";
var abandonedReportsTbodyId = "abandoned-reports-tbody";

var refreshReportLoadingStateStatus = async (url) => {
  var reportsQueueTbody = document.getElementById(reportsQueueTbodyId);
  var abandonedReportsTbody = document.getElementById(abandonedReportsTbodyId);

  while (true) {
    await nextRequestDelay();

    var res = await fetch(url);

    var { reportsQueue, abandonedReports, loadingInProgress } = await res.json();

    reportsQueueTbody.innerHTML = "";
    abandonedReportsTbody.innerHTML = "";

    insertDataToTable(reportsQueue, reportsQueueTbodyId);
    insertDataToTable(abandonedReports, abandonedReportsTbodyId);

    if (!loadingInProgress) {
      break;
    }
  }
};

export default refreshReportLoadingStateStatus;
