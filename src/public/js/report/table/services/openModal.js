import sendChangedData from "./sendChangedData.js";
import updateTotalsTableFields from "./updateTotalsTableFields.js";
import updateSKUsTableFields from "./updateSKUsTableFields.js";

var openModal = async (costPriceData, valueDisplay) => {
  var modal = document.createElement("div");
  modal.className = "modal-overlay";

  var modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  var title = document.createElement("h3");
  title.className = "modal-title";
  title.textContent = "Изменить себестоимость";

  var input = document.createElement("input");
  input.className = "modal-input";
  input.type = "text";
  input.value = valueDisplay.textContent;

  var buttonsContainer = document.createElement("div");
  buttonsContainer.className = "modal-buttons";

  var saveButton = document.createElement("button");
  saveButton.className = "modal-button modal-button-save";
  saveButton.textContent = "Сохранить";
  saveButton.addEventListener("click", async () => {
    valueDisplay.textContent = input.value;
    costPriceData.costPrice = +input.value;

    document.body.removeChild(modal);

    var data = await sendChangedData(costPriceData);

    var { total, ...sku } = data;

    await updateSKUsTableFields(sku);

    await updateTotalsTableFields(total);
  });

  var cancelButton = document.createElement("button");
  cancelButton.className = "modal-button modal-button-cancel";
  cancelButton.textContent = "Отмена";
  cancelButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  buttonsContainer.append(cancelButton, saveButton);
  modalContent.append(title, input, buttonsContainer);
  modal.append(modalContent);
  document.body.append(modal);

  input.focus();

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
};

export default openModal;
