var NEXT_REQUEST_DELAY_MS = 90_000;
var nextRequestDelay = async () => new Promise((res) => setTimeout(res, NEXT_REQUEST_DELAY_MS));

var refreshReportLoadingStateStatus = async (userId, url) => {
  var loadingInProgress = true;

  while (true) {
    await nextRequestDelay()

    var res = await fetch(url, { body: JSON.stringify({ userId }), headers: { "Content-Type": "application/json" } });

    var data = await res.json();

    if (!data.loadingInProgress) {
      break;
    }
  }
};
