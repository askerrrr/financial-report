import getToken from "./getToken.js";
import sendReportData from "./sendReportData.js";
import getReportPeriod from "./getReportPeriod.js";

var main = async () => {
  var getReportBtn = document.getElementById("get-report");

  getReportBtn.onclick = async () => {
    var { token } = await getToken();

    var { dateFrom, dateTo } = await getReportPeriod();

    var success = await sendReportData(token, dateFrom, dateTo);
  };
};

main();
