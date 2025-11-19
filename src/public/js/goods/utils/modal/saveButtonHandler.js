import getCheckedWeekDays from "./getCheckedWeekDays.js";
import sendPriceAndDiscount from "./sendPriceAndDiscount.js";
import updateSkuRowActualFields from "./updateSkuRowActualFields.js";
import updateSkuRowExpectedFields from "./updateSkuRowExpectedFields.js";
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
      var expectedPriceExists = document.getElementById(item.skuName + "-price-expected");

      var confirmed = confirm("Установить новую цену прямо сейчас?");

      if (confirmed) {
        setNewPriceNow = true;
      }

      var sku = { nmID: item.id, price: newPrice, discount: newDiscount };

      var result = await sendPriceAndDiscount(sku, checkedWeekDays, setNewPriceNow, expectedPriceExists);

      modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      modalOverlay.remove();

      if (expectedPriceExists) {
        updateSkuRowExpectedFields(item.skuName, newPrice, newDiscount);
        return;
      }

      updateSkuRowActualFields(item.skuName, newPrice, newDiscount);
    },
  };
};
export default saveButtonHandler;
