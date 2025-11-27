import createDiv from "./utils/createDiv.js";
import createTitle from "./utils/createTitle.js";
import createButton from "./utils/createButton.js";

var skusLastCostPriceModal = () => {
  var modal = createDiv("modal-overlay");
  var modalContent = createDiv("modal-content");

  var titleContent = `Себестоимость будет изменена для этих товаров`;
  var title = createTitle("modal-title", titleContent);

  var buttonsContainer = createDiv("modal-buttons");

  var saveButtonTextContent = "Установить";
  var event = "click";
  var cb = async () => {
    document.body.removeChild(modal);
  };
  var saveButton = createButton("modal-button modal-button-save", saveButtonTextContent, { event, cb });

  cb = () => document.body.removeChild(modal);
  var cancelButtonTextContent = "Отмена";
  var cancelButton = createButton("modal-button modal-button-cancel", cancelButtonTextContent, { event, cb });

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

export default skusLastCostPriceModal;
