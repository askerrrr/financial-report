import getCheckedWeekDays from "./getCheckedWeekDays.js";
import sendPriceAndDiscount from "./sendPriceAndDiscount.js";
import compareCurrentValuesWithNew from "./compareCurrentValuesWithNew.js";

var saveButtonHandler = (modalOverlay, item, newPrice, newDiscount) => {
  return {
    event: "click",
    cb: async () => {
      var { checkedWeekDays } = await getCheckedWeekDays();

      var { valuesAreNotEqual } = compareCurrentValuesWithNew(item, newPrice, newDiscount);

      if (!valuesAreNotEqual) {
        return;
      }

      modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      modalOverlay.remove();
    },
  };
};
export default saveButtonHandler;
