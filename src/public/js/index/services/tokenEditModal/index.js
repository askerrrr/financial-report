import createInput from "./createInput.js";
import createTitle from "./createTitle.js";
import createModal from "./createModal.js";
import createSaveButton from "./createSaveButton.js";
import createModaContent from "./createModaContent.js";
import createCancelButton from "./createCancelButton.js";
import createButtonsContainer from "./createButtonsContainer.js";

var openTokenEditModal = async () => {
  var input = await createInput();

  var modal = await createModal();

  var saveButton = await createSaveButton(input, modal);

  var cancelButton = await createCancelButton(modal);

  var buttonsContainer = await createButtonsContainer();

  buttonsContainer.append(cancelButton, saveButton);

  var modalContent = await createModaContent();

  var title = await createTitle();

  modalContent.append(title, input, buttonsContainer);
  modal.append(modalContent);

  document.body.append(modal);

  input.focus();
};

export default openTokenEditModal;
