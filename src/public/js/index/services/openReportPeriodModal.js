import sendPeriodDate from "./sendPeriodDate.js";
import validateReportPeriod from "./validateReportPeriod.js";
import insertReportToYearMonthTree from "./reportTreeBuilder/index.js";
import { showLoader, deleteLoader } from "./loader.js";

var createModal = async (className) => {
  var modal = document.createElement("div");
  modal.className = className;

  return modal;
};

var createTitle = async () => {
  var title = document.createElement("h3");
  title.append("Введите период отчета");
  title.className = "modal-title";

  return title;
};

var createInputField = async (id, placeholder) => {
  var input = document.createElement("input");
  input.id = id;
  input.type = "text";
  input.placeholder = placeholder;
  input.className = "modal-input";

  return input;
};

var createButtonsContainer = async () => {
  var div = document.createElement("div");
  div.className = "modal-buttons";

  return div;
};

var createSaveButton = async () => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-save";
  button.textContent = "Сохранить";

  return button;
};

var createCancelButton = async () => {
  var button = document.createElement("button");
  button.className = "modal-button modal-button-cancel";
  button.textContent = "Отмена";

  return button;
};

var openReportPeriodModal = async () => {
  var modal = await createModal("modal-overlay");

  var modalContent = await createModal("modal-content");

  var title = await createTitle();

  var dateFromPlacaholder = "начало в формате гг.мм.дд - 2025.04.20";

  var dateFromInput = await createInputField(
    "dateFromInput",
    dateFromPlacaholder
  );

  var dateToPlaceholder = "конец в формате гг.мм.дд - 2025.04.27";

  var dateToInput = await createInputField("dateToInput", dateToPlaceholder);

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
