import createTitle from "../utils/createTitle.js";
import createModal from "../utils/createModal.js";
import createSaveButton from "./createSaveButton.js";
import createInputField from "../utils/createInputField.js";
import createCancelButton from "../utils/createCancelButton.js";
import createButtonsContainer from "../utils/createButtonsContainer.js";

var openWBTokenLoader = async () => {
  var input = createInputField("token");
  input.type = "password";

  var modal = createModal("modal-overlay");

  var saveButton = await createSaveButton(input, modal);

  var cancelButton = createCancelButton(modal);

  var buttonsContainer = createButtonsContainer(cancelButton, saveButton);

  buttonsContainer.append(cancelButton, saveButton);

  var modalContent = createModal("modal-content");

  var title = createTitle("Введите токен");

  modalContent.append(title, input, buttonsContainer);
  modal.append(modalContent);

  document.body.append(modal);

  input.focus();
};

export default openWBTokenLoader;
