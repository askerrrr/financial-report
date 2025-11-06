import createListGoodsTable from "./utils/createListGoodsTable.js";
import enableListGoodsTable from "./utils/enableListGoodsTable.js";
import weekDaySelectorHandler from "./utils/weekDaySelector/index.js";
import enableWeekDaysSelector from "./utils/enableWeekDaysSelector.js";
import loadListGoodsButtonHandler from "./loadListGoodsButtonHandler.js";
import enableUploadListGoodsButton from "./utils/enableUploadListGoodsButton.js";
import setCurrentDayPricesAndDiscounts from "./utils/setCurrentDayPricesAndDiscounts.js";
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

  var { listGoods, weeklyPricesAndDiscounts } = await res.json();

  return { listGoods, weeklyPricesAndDiscounts };
};

var showListGoodsTable = async () => {
  var { listGoods, weeklyPricesAndDiscounts } = await getListGoods();

  if (!listGoods.length) {
    enableUploadListGoodsButton();
    await loadListGoodsButtonHandler();
    return;
  }

  if (weeklyPricesAndDiscounts.length) {
    enableWeekDaysSelector();
    setCurrentDayPricesAndDiscounts();
    await weekDaySelectorHandler(listGoods, weeklyPricesAndDiscounts);
  }

  enableListGoodsTable();
  enableWeeklyPricesAndDiscountsFlleUploadButton();
  enableDownloadWeeklyPricesAndDiscountsFileButton();
  await createListGoodsTable(listGoods);
  return;
};

export default showListGoodsTable;
