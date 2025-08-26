import checkToken from "./checkToken.js";
import showReport from "./showReport.js";
import checkTaxRate from "./checkTaxRate.js";
import sendReportData from "./sendReportData.js";
import checkDateTo from "../index/services/reportPeriodUploader/services/checkDateTo.js";
import checkDateFrom from "../index/services/reportPeriodUploader/services/checkDateFrom.js";
import { showLoader, deleteLoader } from "../index/services/reportPeriodUploader/services/loader.js";

var main = async () => {
  try {
    var getReportBtn = document.getElementById("get-report");

    getReportBtn.onclick = async () => {
      try {
        var token = document.getElementById("token").value;
        var dateFrom = document.getElementById("dateFrom").value;
        var dateTo = document.getElementById("dateTo").value;
        var taxRate = +document.getElementById("tax-rate").value || 0;

        var { token } = await checkToken(token);
        var { validDateFrom } = await checkDateFrom(dateFrom);
        var { validDateTo } = await checkDateTo(dateTo, validDateFrom);
        var { taxRate } = await checkTaxRate(taxRate);

        document.getElementById("dialog").close();

        await showLoader();

        var report = await sendReportData(validDateFrom, validDateTo, token, taxRate);

        if (!report) {
          throw new Error("Возникла ошибка при получении отчета...\nПопробуйте еще раз");
        }

        await deleteLoader();
        await showReport(report);
      } catch (e) {
        alert(e.message);
        await deleteLoader();
      }
    };
  } catch (e) {
    alert(e.message);
    await deleteLoader();
  }
};

main();
