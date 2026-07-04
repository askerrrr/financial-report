import createDiv from "./utils/createDiv.js";
import createTitle from "./utils/createTitle.js";
import createInput from "./utils/createInput.js";
import createButton from "./utils/createButton.js";
import sendChangedData from "../sendChangedData.js";
import updateSKUsTableFields from "../updateSKUsTableFields.js";
import updateTotalsTableFields from "../updateTotalsTableFields.js";

var otherExpensesModal = (skuData, tdElement, isGuestAccess) => {
  var modal = createDiv("modal-overlay");
  var modalContent = createDiv("modal-content");

  var titleContent = `Изменить прочие расходы для "${skuData.skuName}"`;
  var title = createTitle("modal-title", titleContent);

  var otherExpensesInput = createInput("modal-input", tdElement);

  var buttonsContainer = createDiv("modal-buttons");

  var saveButtonTextContent = "Сохранить";
  var event = "click";
  var cb = async () => {
    skuData.otherExpenses = +otherExpensesInput.value;

    document.body.removeChild(modal);

    var data = await sendChangedData(skuData, isGuestAccess, "setotherexpenses");

    if (!data) {
      return;
    }

    tdElement.textContent = otherExpensesInput.value;

    var { year, sku, totals } = data;
    updateSKUsTableFields(year, sku);

    updateTotalsTableFields(year, totals);
  };
  var saveButton = createButton("modal-button modal-button-save", saveButtonTextContent, { event, cb });

  cb = () => document.body.removeChild(modal);
  var cancelButtonTextContent = "Отмена";
  var cancelButton = createButton("modal-button modal-button-cancel", cancelButtonTextContent, { event, cb });

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, otherExpensesInput, buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  otherExpensesInput.focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

export default otherExpensesModal;
