import createButton from "../modal/createButton.js";

var disableSkuHandler = (skuName) => {
  var btnId = skuName + "-disable";

  var handler = {
    event: "click",
    cb: () => {
      var msg = `Скрыть товар <${skuName}> из таблицы?\n`;
      var confirmed = confirm(msg);

      if (confirmed) {
        var skuTableRow = document.getElementById(skuName);
        skuTableRow.remove();
        //inserstToDisabledSKUsTable
      }

      return;
    },
  };

  var button = createButton("скрыть", null, btnId, handler);

  return button;
};

export default disableSkuHandler;
