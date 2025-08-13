import getToken from "./getToken.js";
import sendReportData from "./sendReportData.js";
import getReportPeriod from "./getReportPeriod.js";
import { showLoader, deleteLoader } from "../index/services/reportPeriodUploader/services/loader.js";

var main = async () => {
  try {
    var getReportBtn = document.getElementById("get-report");

    getReportBtn.onclick = async () => {
      var { token } = await getToken();

      var { dateFrom, dateTo } = await getReportPeriod();

      document.getElementById("dialog").close();
      await showLoader();

      var redirectUrl = await sendReportData(dateFrom, dateTo, token);

      if (redirectUrl) {
        await deleteLoader();
        window.location.href = redirectUrl;
      }
    };
  } catch (e) {
    await deleteLoader();
  }
};

main();
