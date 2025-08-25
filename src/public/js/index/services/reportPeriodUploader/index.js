import createModal from "./services/createModal.js";
import createTitle from "./services/createTitle.js";
import isFutureDate from "./services/isFutureDate.js";
import getDateToByDateFrom from "../periodUtils/index.js";
import sendReportPeriod from "./services/sendReportPeriod.js";
import createInputField from "./services/createInputField.js";
import createSaveButton from "./services/createSaveButton.js";
import { showLoader, deleteLoader } from "./services/loader.js";
import createCancelButton from "./services/createCancelButton.js";
import validateReportPeriod from "./services/validateReportPeriod.js";
import createButtonsContainer from "./services/createButtonsContainer.js";
import { isMonday } from "../periodUtils/services/getWeekDaysFromMonth.js";
import insertNewReportToTree from "../reportTreeBuilder/insertNewReportToTree/index.js";

var openReportPeriodModal = async () => {
  var modal = await createModal("modal-overlay");

  var dateFromInput = await createInputField("dateFromInput", "начало в формате гггг.мм.дд - 2025.04.21");

  var dateToInput = await createInputField("dateToInput", "конец в формате гггг.мм.дд - 2025.04.27");

  var saveButton = await createSaveButton();

  saveButton.onclick = async () => {
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

  var cancelButton = await createCancelButton();

  cancelButton.onclick = () => {
    document.body.removeChild(modal);
  };

  var buttonsContainer = await createButtonsContainer();
  buttonsContainer.append(cancelButton, saveButton);

  var title = await createTitle();

  var modalContent = await createModal("modal-content");
  modalContent.append(title, dateFromInput, dateToInput, buttonsContainer);

  modal.append(modalContent);

  document.body.append(modal);

  dateFromInput.focus();

  modal.onclick = (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  };
};

export default openReportPeriodModal;
