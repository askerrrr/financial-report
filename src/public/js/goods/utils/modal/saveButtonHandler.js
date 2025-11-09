import getCheckedWeekDays from "./getCheckedWeekDays.js";
import sendPriceAndDiscount from "./sendPriceAndDiscount.js";
import compareCurrentValuesWithNew from "./compareCurrentValuesWithNew.js";

var saveButtonHandler = (modalOverlay, item, priceInput, discountInput) => {
  return {
    event: "click",
    cb: async () => {
      var { checkedWeekDays } = await getCheckedWeekDays();
      var newPrice = +priceInput.value;
      var newDiscount = +discountInput.value;

      var { valuesAreNotEqual } = compareCurrentValuesWithNew(item, newPrice, newDiscount);

      if (!valuesAreNotEqual) {
        return;
      }

      var result = await sendPriceAndDiscount(item.id, newPrice, newDiscount, checkedWeekDays);

      modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      modalOverlay.remove();
    },
  };
};
export default saveButtonHandler;
