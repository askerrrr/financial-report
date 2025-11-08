import createButton from "../modal/createButton.js";
import disableModalButton from "./disableModalButton.js";
import insertSkuRowToTable from "./insertSkuRowToTable.js";
import sendNewDisableStatus from "./sendNewDisableStatus.js";
import deleteSkuRowFromTable from "./deleteSkuRowFromTable.js";
import disableDisabledTableIfEmpty from "./disableDisabledTableIfEmpty.js";
import changeHiddenStatusOfSkusTable from "./changeSkuTableHiddenStatus.js";

var disableSkuButtonHandler = (skuName) => {
  var btnId = skuName + "-disable";

  var handler = {
    event: "click",
    cb: async () => {
      var msg = `Скрыть товар <${skuName}> из таблицы?\n`;
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
            disableDisabledTableIfEmpty();
            return;
          }

          button.setAttribute("disbl", "");
          button.textContent = "включить";
          disableModalButton(skuName);
          deleteSkuRowFromTable(skuRow, "enabled-skus-tbody");
          insertSkuRowToTable(skuRow, "disabled-skus-tbody");
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
