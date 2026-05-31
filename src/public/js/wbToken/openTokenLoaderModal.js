import createSaveButton from "./createSaveButton.js";
import createTitle from "../index/services/utils/createTitle.js";
import createModal from "../index/services/utils/createModal.js";
import createInputField from "../index/services/utils/createInputField.js";
import createCancelButton from "../index/services/utils/createCancelButton.js";
import createButtonsContainer from "../index/services/utils/createButtonsContainer.js";

var openTokenLoaderModal = (userId) => {
  var input = createInputField("token");
  input.type = "text";

  var modal = createModal("modal-overlay");
  modal.id = "token-modal";

  var saveButton = createSaveButton(userId, input, modal);

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

export default openTokenLoaderModal;
