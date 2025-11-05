import createDiv from "./createDiv.js";
import createLabel from "./createLabel.js";
import createButton from "./createButton.js";
import createPriceInput from "./createPriceInput.js";
import createDiscountnput from "./createDiscountnput.js";
import createDiscountedPriceField from "./createDiscountedPriceField.js";
import peekWeekDays from "./peekWeekDays.js";
import peekWeekDaysHandler from "./peekWeekDaysHandler.js";

var createModal = (item) => {
  var modalTitle = (document.createElement("h3").textContent = "Артикул: " + item.skuName);

  var modalHeader = createDiv(null, "modal-header");
  modalHeader.append(modalTitle);

  var priceInput = createPriceInput(item);
  var priceLabel = createLabel(priceInput, "цена", "wrapinput - yes");

  var discountInput = createDiscountnput(item);
  var discountLabel = createLabel(discountInput, "скидка", "wrapinput - yes");

  var discountedPriceField = createDiscountedPriceField(item);

  var modal = createDiv(null, "modal");

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
    cb: async () => {
      var { checkedWeekDays } = await peekWeekDaysHandler();
      console.log({ skuName: item.skuName, checkedWeekDays });
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      modalOverlay.remove();
    },
  };

  var cancelBtn = createButton("Закрыть", null, "cancelBtn", cancelBtnHandler);
  var saveBtn = createButton("Сохранить", "btn btn-primary", "confirmBtn", saveBtnHandler);

  var modalOverlay = createDiv("modalOverlay", "modal-overlay", null, "enableHandlers - yes");
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
