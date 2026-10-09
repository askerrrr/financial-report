import createButton from "../modal/createButton.js";
import getConfirmMessage from "./getConfirmMessage.js";
import insertSkuRowToTable from "./insertSkuRowToTable.js";
import sendNewDisableStatus from "./sendNewDisableStatus.js";
import deleteSkuRowFromTable from "./deleteSkuRowFromTable.js";
import {
  blockPriceDiscountModalOpening,
  unlockPriceDiscountModalOpening,
} from "./priceDiscountModalOpening.js";
import disableSkusTableIfEmpty from "./disableSkusTableIfEmpty.js";
import changeDisableStatusOfModalButton from "./changeDisableStatusOfModalButton.js";

/**
 * @param {'to-enable' | 'to-disable'} msg
 */

var enabledCountElem = document.getElementById("enabled-count");
var disabledCountElem = document.getElementById("disabled-count");

var createSkuRowVisibilityButtonHandler = (skuName, id) => {
  var btnId = skuName + "-disable";
  var msg = getConfirmMessage(skuName, "to-disable");

  var handler = {
    event: "click",
    cb: async () => {
      var confirmed = confirm(msg);

      if (confirmed) {
        var hasDsblAttribute = button.hasAttribute("disbl");
        var statusIsUpdated = await sendNewDisableStatus(
          skuName,
          id,
          hasDsblAttribute,
        );

        if (statusIsUpdated) {
          var skuRow = document.getElementById(skuName);

          if (hasDsblAttribute) {
            button.removeAttribute("disbl");
            button.textContent = "скрыть";

            unlockPriceDiscountModalOpening(skuName);
            changeDisableStatusOfModalButton(skuName, "off");
            deleteSkuRowFromTable(skuRow, "disabled-skus-tbody");
            insertSkuRowToTable(skuRow, "enabled-skus-tbody");

            msg = getConfirmMessage(skuName, "to-disable");

            var currentEnabledCount = +enabledCountElem.textContent || 0;
            var currentDisabledCount = +disabledCountElem.textContent || 0;

            enabledCountElem.textContent = currentEnabledCount + 1;
            disabledCountElem.textContent = currentDisabledCount - 1;
          } else {
            button.setAttribute("disbl", "");
            button.textContent = "включить";

            blockPriceDiscountModalOpening(skuName);
            changeDisableStatusOfModalButton(skuName, "on");
            deleteSkuRowFromTable(skuRow, "enabled-skus-tbody");
            insertSkuRowToTable(skuRow, "disabled-skus-tbody");

            msg = getConfirmMessage(skuName, "to-enable");

            var currentEnabledCount = +enabledCountElem.textContent || 0;
            var currentDisabledCount = +disabledCountElem.textContent || 0;

            enabledCountElem.textContent = currentEnabledCount - 1;
            disabledCountElem.textContent = currentDisabledCount + 1;
          }

          disableSkusTableIfEmpty(hasDsblAttribute);
        }
      }
    },
  };

  var button = createButton("скрыть", "item", btnId, handler);

  return button;
};

export default createSkuRowVisibilityButtonHandler;
