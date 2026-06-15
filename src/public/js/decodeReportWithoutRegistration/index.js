import showReport from "./showReport.js";
import checkTaxRate from "./checkTaxRate.js";
import sendReportData from "./sendReportData.js";
import sendTokenForValidation from "./sendTokenForValidation.js";
import writeReportToLocalStorage from "./writeReportToLocalStorage.js";
import checkDateTo from "../index/reportLoaderModalWindow/services/checkDateTo.js";
import checkDateFrom from "../index/reportLoaderModalWindow/services/checkDateFrom.js";
import { showLoader, deleteLoader } from "../index/reportLoaderModalWindow/services/loader.js";

var errorMsg = "Что-то пошло не так...";

var main = async () => {
  try {
    var getReportBtn = document.getElementById("get-report");

    getReportBtn.onclick = async () => {
      try {
        var token = document.getElementById("token").value;
        var dateFrom = document.getElementById("dateFrom").value;
        var dateTo = document.getElementById("dateTo").value;
        var taxRate = +document.getElementById("tax-rate").value || 0;

        var tokenIsValid = await sendTokenForValidation(token);

        if (!tokenIsValid) {
          alert("Некорректный токен");
          return;
        }

        var { validDateFrom } = await checkDateFrom(dateFrom);
        var { validDateTo } = await checkDateTo(dateTo, validDateFrom);
        var { taxRate } = await checkTaxRate(taxRate);

        document.getElementById("dialog").close();

        await showLoader();

        var report = await sendReportData(validDateFrom, validDateTo, token, taxRate);

        if (!report) {
          throw new Error("Возникла ошибка при получении отчета...\nПопробуйте еще раз");
        }

        writeReportToLocalStorage(report);
        await deleteLoader().then(() => showReport(report));
      } catch (e) {
        alert(errorMsg);
        await deleteLoader();
      }
    };
  } catch (e) {
    alert(errorMsg);
    await deleteLoader();
  }
};

main();
