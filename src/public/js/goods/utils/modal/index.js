import createDiv from "./createDiv.js";
import createLabel from "./createLabel.js";
import peekWeekDays from "./peekWeekDays.js";
import createButton from "./createButton.js";
import createPriceInput from "./createPriceInput.js";
import saveButtonHandler from "./saveButtonHandler.js";
import createDiscountnput from "./createDiscountnput.js";
import cancelButtonHandler from "./cancelButtonHandler.js";
import createDiscountedPriceField from "./createDiscountedPriceField.js";

var createModal = (item) => {
  var modalTitle = (document.createElement("h3").textContent = "Артикул: " + item.skuName);

  var modalHeader = createDiv(null, "modal-header");
  modalHeader.append(modalTitle);

  var modalOverlay = createDiv("modalOverlay", "modal-overlay", null, "enableHandlers - yes");

  var priceInput = createPriceInput(item);
  var priceLabel = createLabel(priceInput, "цена", "wrapinput - yes");

  var discountInput = createDiscountnput(item);
  var discountLabel = createLabel(discountInput, "скидка", "wrapinput - yes");

  var discountedPriceField = createDiscountedPriceField(item);

  var modal = createDiv(null, "modal");

  var cancelBtn = createButton("Закрыть", null, "cancelBtn", cancelButtonHandler(modalOverlay));

  var newPrice = +priceInput.value;
  var newDiscount = +discountInput.value;

  var saveBtn = createButton(
    "Сохранить",
    "btn btn-primary",
    "confirmBtn",
    saveButtonHandler(modalOverlay, item, newPrice, newDiscount)
  );

  var modalButtons = createDiv(null, "modal-buttons");
  modalButtons.append(cancelBtn, saveBtn);

  modal.append(
    modalHeader,
    priceLabel,
    discountLabel,
    discountedPriceField,
    peekWeekDays(),
    modalButtons
  );

  modalOverlay.append(modal);

  document.body.append(modalOverlay);

  return modalOverlay;
};

export default createModal;
