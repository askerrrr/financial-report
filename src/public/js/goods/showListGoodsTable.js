import createListGoodsTable from "./utils/createListGoodsTable.js";
import enableListGoodsTable from "./utils/enableListGoodsTable.js";
import enableFlleUploadButton from "./utils/enableFlleUploadButton.js";
import loadListGoodsButtonHandler from "./loadListGoodsButtonHandler.js";
import enableLoadListGoodsButton from "./utils/enableLoadListGoodsButton.js";
import enableDownloadWeeklyPricesFileButton from "./utils/enableDownloadWeeklyPricesFileButton.js";

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
    enableLoadListGoodsButton();
    await loadListGoodsButtonHandler();
    return;
  }

  enableListGoodsTable();
  enableFlleUploadButton();
  enableDownloadWeeklyPricesFileButton();
  await createListGoodsTable(listGoods);
};

export default showListGoodsTable;
