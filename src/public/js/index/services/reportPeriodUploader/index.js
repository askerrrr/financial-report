import createModal from "./services/createModal.js";
import createTitle from "./services/createTitle.js";
import createInputField from "./services/createInputField.js";
import createSaveButton from "./services/createSaveButton.js";
import createCancelButton from "./services/createCancelButton.js";
import createButtonsContainer from "./services/createButtonsContainer.js";

var openReportPeriodModal = async () => {
  var modal = await createModal("modal-overlay");

  var dateFromInput = await createInputField("dateFromInput", "начало в формате гггг.мм.дд - 2025.04.21");

  var dateToInput = await createInputField("dateToInput", "конец в формате гггг.мм.дд - 2025.04.27");

  var saveButton = await createSaveButton(modal, dateFromInput, dateToInput);

  var cancelButton = await createCancelButton(modal);

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
