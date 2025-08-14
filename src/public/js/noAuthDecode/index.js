import checkToken from "./checkToken.js";
import showReport from "./showReport.js";
import sendReportData from "./sendReportData.js";
import { checkDateFrom, checkDateTo } from "./checkReportPeriod.js";
import { showLoader, deleteLoader } from "../index/services/reportPeriodUploader/services/loader.js";

var main = async () => {
  try {
    var getReportBtn = document.getElementById("get-report");

    getReportBtn.onclick = async () => {
      var token = document.getElementById("token").value;

      if (!token) {
        alert("Введите токен");
        return;
      }

      var dateFrom = document.getElementById("dateFrom").value;

      if (!dateFrom) {
        alert("Введите начало отчетного периода");
        return;
      }

      var { validToken } = await checkToken(token);
      var { validDateFrom } = await checkDateFrom(dateFrom);
      var { validDateTo } = await checkDateTo(validDateFrom);

      document.getElementById("dialog").close();
      await showLoader();

      var report = await sendReportData(validDateFrom, validDateTo, validToken);

      if (!report) {
        await deleteLoader();
        throw new Error("Возникла ошибка при получении отчета...\nПопробуйте еще раз");
      }

      await deleteLoader();
      await showReport(report);
    };
  } catch (e) {
    alert(e.message);

    await deleteLoader();
  }
};

main();
