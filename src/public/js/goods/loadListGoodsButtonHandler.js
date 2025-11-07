import enableListGoodsTable from "./utils/enableListGoodsTable.js";
import createSkusTable from "./utils/createSkusTable.js";
import disableUploadListGoodsButton from "./utils/disableUploadListGoodsButton.js";
import enableWeeklyPricesAndDiscountsFlleUploadButton from "./utils/enableWeeklyPricesAndDiscountsFlleUploadButton.js";
import enableDownloadWeeklyPricesAndDiscountsFileButton from "./utils/enableDownloadWeeklyPricesAndDiscountsFileButton.js";

var userId = document.cookie.split("=")[1];

var loadListGoodsButtonHandler = async () => {
  document.getElementById("upload-list-goods").addEventListener("click", async (e) => {
    e.preventDefault();

    var res = await fetch("/goods", {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: { "content-type": "application/json" },
    });

    if (!res.ok) {
      var { msg } = await res.json();
      alert(msg);
      return;
    }

    var { listGoods } = await res.json();

    enableListGoodsTable();
    enableWeeklyPricesAndDiscountsFlleUploadButton();
    disableUploadListGoodsButton();
    enableDownloadWeeklyPricesAndDiscountsFileButton();
    await createSkusTable(listGoods, "enabled-skus-tbody");
  });
};

export default loadListGoodsButtonHandler;
