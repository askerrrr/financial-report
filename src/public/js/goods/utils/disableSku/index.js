import createButton from "../modal/createButton.js";
import disableModalButton from "./disableModalButton.js";
import insertSkuRowToTable from "./insertSkuRowToTable.js";
import sendNewDisableStatus from "./sendNewDisableStatus.js";
import deleteSkuRowFromTable from "./deleteSkuRowFromTable.js";
import disableDisabledTableIfEmpty from "./disableDisabledTableIfEmpty.js";
import changeHiddenStatusOfSkusTable from "./changeSkuTableHiddenStatus.js";

/**
 * @param {'to-enable' | 'to-disable'} msg
 */

var getConfirmMessage = (skuName, msg) =>
  msg === "to-disable"
    ? `Скрыть товар <${skuName}> из таблицы?\n`
    : `Включить товар <${skuName}> в таблицу?\n`;

var disableSkuButtonHandler = (skuName) => {
  var btnId = skuName + "-disable";
  var msg = getConfirmMessage(skuName, "to-disable");

  var handler = {
    event: "click",
    cb: async () => {
      var confirmed = confirm(msg);

      if (confirmed) {
        var statusIsUpdated = await sendNewDisableStatus(skuName, true);

        if (statusIsUpdated) {
          var skuRow = document.getElementById(skuName);

          if (button.hasAttribute("disbl")) {
            button.removeAttribute("disbl");
            button.textContent = "скрыть";
            deleteSkuRowFromTable(skuRow, "disabled-skus-tbody");
            insertSkuRowToTable(skuRow, "enabled-skus-tbody");
            msg = getConfirmMessage(skuName, "to-disable");
            disableDisabledTableIfEmpty();
            return;
          }

          button.setAttribute("disbl", "");
          button.textContent = "включить";
          disableModalButton(skuName);
          deleteSkuRowFromTable(skuRow, "enabled-skus-tbody");
          insertSkuRowToTable(skuRow, "disabled-skus-tbody");
          msg = getConfirmMessage(skuName, "to-enable");
          changeHiddenStatusOfSkusTable("disabled-skus-table", "off");
          disableDisabledTableIfEmpty();
        }
      }

      return;
    },
  };

  var button = createButton("скрыть", null, btnId, handler);

  return button;
};

export default disableSkuButtonHandler;
