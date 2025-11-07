import createButton from "../modal/createButton.js";
import insertSkuRowToTable from "./insertSkuRowToTable.js";
import sendNewDisableStatus from "./sendNewDisableStatus.js";
import deleteSkuRowFromTable from "./deleteSkuRowFromTable.js";

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

          deleteSkuRowFromTable(skuRow, "enabled-skus-tbody");
          insertSkuRowToTable(skuRow, "disabled-skus-tbody");
        }
      }

      return;
    },
  };

  var button = createButton("скрыть", null, btnId, handler);

  return button;
};

export default disableSkuButtonHandler;
