import createModal from "./services/createModal.js";
import createTitle from "./services/createTitle.js";
import sendPeriodDate from "./services/sendPeriodDate.js";
import createInputField from "./services/createInputField.js";
import createSaveButton from "./services/createSaveButton.js";
import { showLoader, deleteLoader } from "./services/loader.js";
import createCancelButton from "./services/createCancelButton.js";
import validateReportPeriod from "./services/validateReportPeriod.js";
import insertReportToYearMonthTree from "../reportTreeBuilder/index.js";
import createButtonsContainer from "./services/createButtonsContainer.js";

var openReportPeriodModal = async () => {
  var modal = await createModal("modal-overlay");

  var modalContent = await createModal("modal-content");

  var title = await createTitle();

  var dateFromInput = await createInputField(
    "dateFromInput",
    "начало в формате гг.мм.дд - 2025.04.21"
  );

  var dateToInput = await createInputField(
    "dateToInput",
    "конец в формате гг.мм.дд - 2025.04.27"
  );

  var buttonsContainer = await createButtonsContainer();

  var saveButton = await createSaveButton();

  saveButton.addEventListener("click", async () => {
    document.body.removeChild(modal);

    var dateFrom = dateFromInput.value;
    var validDateFrom = await validateReportPeriod(dateFrom);

    if (!validDateFrom) {
      return alert("Начало периода введено некорректно");
    }

    var dateTo = dateToInput.value;
    var validDateTo = await validateReportPeriod(dateTo);

    if (!validDateTo) {
      return alert("Конец периода введен некорректно");
    }

    await showLoader();

    var reportData = await sendPeriodDate(validDateFrom, validDateTo);

    if (!reportData) {
      await deleteLoader();

      return alert("Не удалось сохранить отчет");
    }

    await deleteLoader();

    await insertReportToYearMonthTree(reportData);

    return alert("Отчет успешно сохранен");
  });

  var cancelButton = await createCancelButton();

  cancelButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  buttonsContainer.append(cancelButton, saveButton);

  modalContent.append(title, dateFromInput, dateToInput, buttonsContainer);

  modal.append(modalContent);

  document.body.append(modal);

  dateFromInput.focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

export default openReportPeriodModal;
