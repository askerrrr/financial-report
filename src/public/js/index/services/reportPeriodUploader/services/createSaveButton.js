import isFutureDate from "./isFutureDate.js";
import sendReportPeriod from "./sendReportPeriod.js";
import { showLoader, deleteLoader } from "./loader.js";
import checkReportExists from "./checkReportExists.js";
import getDateToByDateFrom from "../../periodUtils/index.js";
import standardizeDate from "./standardizeDate.js";
import { isMonday } from "../../periodUtils/services/getWeekDaysFromMonth.js";
import insertNewReportToTree from "../../reportTreeBuilder/insertNewReportToTree/index.js";

var createSaveButton = async (modal, dateFromInput, dateToInput) => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-save";
  button.textContent = "Сохранить";

  button.onclick = async () => {
    document.body.removeChild(modal);

    var dateFrom = dateFromInput.value;
    var standardizedDateFrom = await standardizeDate(dateFrom);

    if (!standardizedDateFrom) {
      return alert("Начало периода введено некорректно");
    }

    if (await isFutureDate(standardizedDateFrom)) {
      return alert("Период введен некорректно");
    }

    if (!(await isMonday(standardizedDateFrom))) {
      return alert("Начало периода не является понедельником");
    }

    var dateTo = dateToInput?.value;

    if (!dateTo) {
      dateTo = await getDateToByDateFrom(standardizedDateFrom);
    }

    var standardizedDateTo = await standardizeDate(dateTo);

    if (await isFutureDate(standardizedDateTo)) {
      return alert("Отчет еще не готов...");
    }

    if (!standardizedDateTo) {
      return alert("Конец периода введен некорректно");
    }

    var reportIsExist = await checkReportExists(standardizedDateFrom, standardizedDateTo);

    if (reportIsExist) {
      return;
    }

    await showLoader();

    var reportData = await sendReportPeriod(standardizedDateFrom, standardizedDateTo);

    if (!reportData) {
      await deleteLoader();

      return;
    }

    await deleteLoader();

    await insertNewReportToTree(reportData);

    var confirmed = confirm("Отчет успешно сохранен.\nПерейти к отчету?");

    if (confirmed) {
      window.location.href = "/reports/" + reportData.reportId;
    }

    return;
  };

  return button;
};

export default createSaveButton;
