import isFutureDate from "./isFutureDate.js";
import sendReportPeriod from "./sendReportPeriod.js";
import { showLoader, deleteLoader } from "./loader.js";
import getDateToByDateFrom from "../../periodUtils/index.js";
import validateReportPeriod from "./validateReportPeriod.js";
import { isMonday } from "../../periodUtils/services/getWeekDaysFromMonth.js";
import insertNewReportToTree from "../../reportTreeBuilder/insertNewReportToTree/index.js";

var createSaveButton = async (modal, dateFromInput, dateToInput) => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-save";
  button.textContent = "Сохранить";

  button.onclick = async () => {
    document.body.removeChild(modal);

    var dateFrom = dateFromInput.value;
    var validDateFrom = await validateReportPeriod(dateFrom);

    if (!validDateFrom) {
      return alert("Начало периода введено некорректно");
    }

    if (await isFutureDate(validDateFrom)) {
      return alert("Период введен некорректно");
    }

    if (!(await isMonday(validDateFrom))) {
      return alert("Начало периода не является понедельником");
    }

    var dateTo = dateToInput?.value;

    if (!dateTo) {
      dateTo = await getDateToByDateFrom(validDateFrom);
    }

    var validDateTo = await validateReportPeriod(dateTo);

    if (await isFutureDate(validDateTo)) {
      return alert("Отчет еще не готов...");
    }

    if (!validDateTo) {
      return alert("Конец периода введен некорректно");
    }

    await showLoader();

    var reportData = await sendReportPeriod(validDateFrom, validDateTo);

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
