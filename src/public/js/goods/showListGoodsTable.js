import createListGoodsTable from "./utils/createListGoodsTable.js";
import enableListGoodsTable from "./utils/enableListGoodsTable.js";
import loadListGoodsButtonHandler from "./loadListGoodsButtonHandler.js";
import enableUploadListGoodsButton from "./utils/enableUploadListGoodsButton.js";
import disableUploadListGoodsButton from "./utils/disableUploadListGoodsButton.js";
import enableWeeklyPricesAndDiscountsFlleUploadButton from "./utils/enableWeeklyPricesAndDiscountsFlleUploadButton.js";
import enableDownloadWeeklyPricesAndDiscountsFileButton from "./utils/enableDownloadWeeklyPricesAndDiscountsFileButton.js";

var getListGoods = async () => {
  var userId = document.cookie.split("=")[1];
  var url = "/goods/api/" + userId;

  var res = await fetch(url);

  if (!res.ok) {
    alert("some error message");
    return;
  }

  var { listGoods } = await res.json();

  return { listGoods };
};

var showListGoodsTable = async () => {
  var { listGoods } = await getListGoods();

  if (!listGoods.length) {
    enableUploadListGoodsButton();
    await loadListGoodsButtonHandler();
    return;
  }

  enableListGoodsTable();
  // disableUploadListGoodsButton();
  enableWeeklyPricesAndDiscountsFlleUploadButton();
  enableDownloadWeeklyPricesAndDiscountsFileButton();
  await createListGoodsTable(listGoods);
};

export default showListGoodsTable;
