import getGoodsData from "./utils/getGoodsData.js";
import createSkusTable from "./utils/createSkusTable.js";
import enableSkusTable from "./utils/enableSkusTable.js";
import weekDaySelectorHandler from "./utils/weekDaySelector/index.js";
import enableWeekDaysSelector from "./utils/enableWeekDaysSelector.js";
import loadListGoodsButtonHandler from "./loadListGoodsButtonHandler.js";
import enableUploadListGoodsButton from "./utils/enableUploadListGoodsButton.js";
import setCurrentDayPricesAndDiscounts from "./utils/setCurrentDayPricesAndDiscounts.js";
import enableWeeklyPricesAndDiscountsFlleUploadButton from "./utils/enableWeeklyPricesAndDiscountsFlleUploadButton.js";
import enableDownloadWeeklyPricesAndDiscountsFileButton from "./utils/enableDownloadWeeklyPricesAndDiscountsFileButton.js";

var showListGoodsTable = async () => {
  var { listGoods, weeklyPricesAndDiscounts } = await getGoodsData();
  var { enabledSku, disabledSku } = listGoods;

  if (!enabledSku.length) {
    enableUploadListGoodsButton();
    await loadListGoodsButtonHandler();
    return;
  }

  if (weeklyPricesAndDiscounts.length) {
    enableWeekDaysSelector();
    setCurrentDayPricesAndDiscounts();
    await weekDaySelectorHandler(enabledSku, weeklyPricesAndDiscounts);
  }

  enableSkusTable("enabled-skus-table");
  enableWeeklyPricesAndDiscountsFlleUploadButton();
  enableDownloadWeeklyPricesAndDiscountsFileButton();
  await createSkusTable(enabledSku, "enabled-skus-tbody");
  return;
};

export default showListGoodsTable;
