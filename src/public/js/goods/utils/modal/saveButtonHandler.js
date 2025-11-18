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

      var setNewPriceNow = false;

      var confirmed = confirm("Установить новую цену прямо сейчас?");

      if (confirmed) {
        setNewPriceNow = true;
      }

      console.log({ setNewPriceNow });

      var result = await sendPriceAndDiscount(
        item.id,
        newPrice,
        newDiscount,
        checkedWeekDays,
        setNewPriceNow
      );

      modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      modalOverlay.remove();
    },
  };
};
export default saveButtonHandler;
