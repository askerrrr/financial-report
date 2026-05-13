import createDiv from "./utils/createDiv.js";
import createTitle from "./utils/createTitle.js";
import createInput from "./utils/createInput.js";
import createButton from "./utils/createButton.js";
import sendChangedData from "../sendChangedData.js";
import updateSKUsTableFields from "../updateSKUsTableFields.js";
import updateTotalsTableFields from "../updateTotalsTableFields.js";

var costPriceModal = (skuData, tdElement, isGuestAccess) => {
  var modal = createDiv("modal-overlay");
  var modalContent = createDiv("modal-content");

  var titleContent = `Изменить себестоимость для "${skuData.skuName}"`;
  var title = createTitle("modal-title", titleContent);

  var costPriceInput = createInput("modal-input", tdElement);

  var buttonsContainer = createDiv("modal-buttons");

  var saveButtonTextContent = "Сохранить";
  var event = "click";
  var cb = async () => {
    tdElement.textContent = costPriceInput.value;
    skuData.costPrice = +costPriceInput.value;

    document.body.removeChild(modal);

    var { total, sku } = await sendChangedData(skuData, isGuestAccess, "setcostprice");

    await updateSKUsTableFields(sku);

    await updateTotalsTableFields(total);
  };
  var saveButton = createButton("modal-button modal-button-save", saveButtonTextContent, { event, cb });

  cb = () => document.body.removeChild(modal);
  var cancelButtonTextContent = "Отмена";
  var cancelButton = createButton("modal-button modal-button-cancel", cancelButtonTextContent, { event, cb });

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, costPriceInput, buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  costPriceInput.focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

export default costPriceModal;
