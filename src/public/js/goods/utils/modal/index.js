import createDiv from "./createDiv.js";
import createLabel from "./createLabel.js";
import createButton from "./createButton.js";
import createPriceInput from "./createPriceInput.js";
import createDiscountnput from "./createDiscountnput.js";
import createDiscountedPriceField from "./createDiscountedPriceField.js";
import peekWeek from "./peekWeek.js";

var createModal = (item) => {
  var modalTitle = (document.createElement("h3").textContent = "Артикул: " + item.skuName);

  var modalHeader = createDiv("modal-header");
  modalHeader.append(modalTitle);

  var priceInput = createPriceInput(item);
  var priceLabel = createLabel(priceInput, "цена");

  var discountInput = createDiscountnput(item);
  var discountLabel = createLabel(discountInput, "скидка");

  var discountedPriceField = createDiscountedPriceField(item);

  var modal = createDiv("modal");
  modal.append(modalHeader, priceLabel, discountLabel, discountedPriceField, peekWeek());

  var cancelBtnHandler = {
    event: "click",
    cb: () => {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      modalOverlay.remove();
    },
  };

  var saveBtnHandler = {
    event: "click",
    cb: () => {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      modalOverlay.remove();
    },
  };

  var cancelBtn = createButton("Закрыть", "btn btn-secondary", "cancelBtn", cancelBtnHandler);
  var saveBtn = createButton("Сохранить", "btn btn-primary", "confirmBtn", saveBtnHandler);

  var modalOverlay = createDiv("modal-overlay", "modalOverlay", null, "enableHandlers - yes");
  modalOverlay.append(modal, cancelBtn, saveBtn);

  document.body.append(modalOverlay);

  return modalOverlay;
};

export default createModal;
