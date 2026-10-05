import createLabel from "./services/createLabel.js";
import createSaveButton from "./services/createSaveButton.js";
import createModal from "../utils/modalWindowUtils/createModal.js";
import createTitle from "../utils/modalWindowUtils/createTitle.js";
import createInputField from "../utils/modalWindowUtils/createInputField.js";
import createCancelButton from "../utils/modalWindowUtils/createCancelButton.js";
import createButtonsContainer from "../utils/modalWindowUtils/createButtonsContainer.js";
import createUploadAllReportsCheckbox from "./services/createUploadAllReportsCheckbox.js";

var openReportPeriodModalWindow = (userId) => {
  var modal = createModal("modal-overlay");
  modal.id = "report-period-modal";

  var modalContent = createModal("modal-content report-period-modal-content");
  var modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  var title = createTitle("Введите период отчета");

  var closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "modal-close-btn";
  closeButton.textContent = "×";
  closeButton.onclick = () => modal.remove();

  var modalBody = document.createElement("div");
  modalBody.className = "modal-body";

  var dateFromInput = createInputField(
    "dateFromInput",
    "начало в формате гггг.мм.дд - 2025.04.21",
  );
  var dateToInput = createInputField(
    "dateToInput",
    "конец в формате гггг.мм.дд - 2025.04.27",
  );

  var uploadAllReportsCheckbox = createUploadAllReportsCheckbox();
  var label = createLabel("загрузить все отчеты", uploadAllReportsCheckbox);
  label.className = "modal-checkbox-label";

  var saveButton = createSaveButton(
    userId,
    modal,
    dateFromInput,
    dateToInput,
    uploadAllReportsCheckbox,
  );
  var cancelButton = createCancelButton(modal);
  saveButton.className = "modal-btn modal-btn-primary";
  cancelButton.className = "modal-btn modal-btn-cancel";

  var buttonsContainer = createButtonsContainer(cancelButton, saveButton);
  buttonsContainer.className = "modal-footer";

  modalHeader.append(title, closeButton);
  modalBody.append(dateFromInput, dateToInput, label);
  modalContent.append(modalHeader, modalBody, buttonsContainer);

  modal.append(modalContent);
  document.body.append(modal);

  dateFromInput.focus();
};

export default openReportPeriodModalWindow;
