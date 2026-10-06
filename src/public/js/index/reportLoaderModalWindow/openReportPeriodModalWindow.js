import createLabel from "./services/createLabel.js";
import createSaveButton from "./services/createSaveButton.js";
import createModal from "../utils/modalWindowUtils/createModal.js";
import createTitle from "../utils/modalWindowUtils/createTitle.js";
import createInputField from "../utils/modalWindowUtils/createInputField.js";
import createCancelButton from "../utils/modalWindowUtils/createCancelButton.js";
import createButtonsContainer from "../utils/modalWindowUtils/createButtonsContainer.js";
import createUploadAllReportsCheckbox from "./services/createUploadAllReportsCheckbox.js";

var placeholder = "гггг-мм-дд";

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

  var dateFromInput = createInputField("dateFromInput", placeholder);
  var dateToInput = createInputField("dateToInput", placeholder);

  var periodFieldsRow = document.createElement("div");
  periodFieldsRow.className = "report-period-fields";

  var dateFromGroup = document.createElement("div");
  dateFromGroup.className = "report-period-field";
  var dateFromLabel = document.createElement("span");
  dateFromLabel.className = "report-period-field-label";
  dateFromLabel.textContent = "начало";
  dateFromGroup.append(dateFromLabel, dateFromInput);

  var dateToGroup = document.createElement("div");
  dateToGroup.className = "report-period-field";
  var dateToLabel = document.createElement("span");
  dateToLabel.className = "report-period-field-label";
  dateToLabel.textContent = "конец";
  dateToGroup.append(dateToLabel, dateToInput);

  periodFieldsRow.append(dateFromGroup, dateToGroup);

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
  modalBody.append(periodFieldsRow, label);
  modalContent.append(modalHeader, modalBody, buttonsContainer);

  modal.append(modalContent);
  document.body.append(modal);

  dateFromInput.focus();

  new Datepicker(dateFromInput, {
    language: "ru",
    format: "yyyy-mm-dd",
    todayHighlight: false,
    beforeShowDay: (date) => {
      var isMonday = date.getDay() === 1;

      return {
        enabled: isMonday,
      };
    },
  });

  new Datepicker(dateToInput, {
    language: "ru",
    format: "yyyy-mm-dd",
    autoFocus: false,
    todayHighlight: false,
    beforeShowDay: (date) => {
      var isMonday = date.getDay() === 0;

      return {
        enabled: isMonday,
      };
    },
  });
};

export default openReportPeriodModalWindow;
