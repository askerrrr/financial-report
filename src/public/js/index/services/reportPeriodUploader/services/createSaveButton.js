import checkDateTo from "./checkDateTo.js";
import checkDateFrom from "./checkDateFrom.js";
import sendReportPeriod from "./sendReportPeriod.js";
import { showLoader, deleteLoader } from "./loader.js";
import insertNewReportToTree from "../../reportTreeBuilder/insertNewReportToTree/index.js";

var createSaveButton = async (modal, dateFromInput, dateToInput) => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-save";
  button.textContent = "Сохранить";

  button.onclick = async () => {
    document.body.removeChild(modal);

    var dateFrom = dateFromInput.value;
    var validDateFrom = await checkDateFrom(dateFrom);

    var dateTo = dateToInput?.value;
    var validDateTo = await checkDateTo(dateTo, validDateFrom);

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
