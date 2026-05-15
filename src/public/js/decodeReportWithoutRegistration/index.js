import checkToken from "./checkToken.js";
import showReport from "./showReport.js";
import checkTaxRate from "./checkTaxRate.js";
import sendReportData from "./sendReportData.js";
import writeReportToLocalStorage from "./writeReportToLocalStorage.js";
import checkDateTo from "../index/services/reportLoader/services/checkDateTo.js";
import checkDateFrom from "../index/services/reportLoader/services/checkDateFrom.js";
import { showLoader, deleteLoader } from "../index/services/reportLoader/services/loader.js";

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

        var data = await sendReportData("validDateFrom, validDateTo, token, taxRate");

        if (!data) {
          throw new Error("Возникла ошибка при получении отчета...\nПопробуйте еще раз");
        }

        writeReportToLocalStorage(data.report);
        await deleteLoader().then(() => showReport(data));
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
