import getGoodsData from "./utils/getGoodsData.js";
import createSkusTable from "./utils/createSkusTable.js";
import enableSkusTable from "./utils/enableSkusTable.js";
import getCurrentDayMSK from "./utils/getCurrentDayMSK.js";
import weekDaySelectorHandler from "./utils/weekDaySelector/index.js";
import enableWeekDaysSelector from "./utils/enableWeekDaysSelector.js";
import loadListGoodsButtonHandler from "./loadListGoodsButtonHandler.js";
import enableUploadListGoodsButton from "./utils/enableUploadListGoodsButton.js";
import setWeekDaySelectorToCurrentDay from "./utils/setWeekDaySelectorToCurrentDay.js";
import enableWeeklyPricesAndDiscountsFlleUploadButton from "./utils/enableWeeklyPricesAndDiscountsFlleUploadButton.js";
import enableDownloadWeeklyPricesAndDiscountsFileButton from "./utils/enableDownloadWeeklyPricesAndDiscountsFileButton.js";
import mergeCurrentDayPricesAndDiscountsIntoListGoods from "./utils/weekDaySelector/mergeCurrentDayPricesAndDiscountsIntoListGoods.js";

var showListGoodsTable = async () => {
  var { listGoods, weeklyPricesAndDiscounts } = await getGoodsData();
  var { enabledSku, disabledSku } = listGoods;

  if (!enabledSku.length && !disabledSku.length) {
    await handleEmptySkus();
    return;
  }

  if (!enabledSku.length && disabledSku.length) {
    await handleEmptyEnabledSkus(disabledSku);
    return;
  }

  if (weeklyPricesAndDiscounts.length) {
    await handleNonEmptyWeeklyPricesAndDiscounts(listGoods, weeklyPricesAndDiscounts);
    return;
  }

  handleNonEmptyEnabledSkus(listGoods);
};

export default showListGoodsTable;

var handleEmptySkus = async function () {
  enableUploadListGoodsButton();
  await loadListGoodsButtonHandler();
};

var handleEmptyEnabledSkus = async function (disabledSku) {
  enableSkusTable("disabled-skus-table");
  enableWeeklyPricesAndDiscountsFlleUploadButton();
  enableDownloadWeeklyPricesAndDiscountsFileButton();
  await createSkusTable(disabledSku, "disabled-skus-tbody");
};

var handleNonEmptyEnabledSkus = async function ({ enabledSku, disabledSku }) {
  enableSkusTable("enabled-skus-table");
  enableSkusTable("disabled-skus-table");
  enableWeeklyPricesAndDiscountsFlleUploadButton();
  enableDownloadWeeklyPricesAndDiscountsFileButton();
  await createSkusTable(enabledSku, "enabled-skus-tbody");
  await createSkusTable(disabledSku, "disabled-skus-tbody");
};

var handleNonEmptyWeeklyPricesAndDiscounts = async function ({ enabledSku, disabledSku }, weeklyPricesAndDiscounts) {
  var { currentDayName, currentDayIndex } = getCurrentDayMSK();

  enableWeekDaysSelector();
  enableSkusTable("enabled-skus-table");
  setWeekDaySelectorToCurrentDay(currentDayName);
  enableWeeklyPricesAndDiscountsFlleUploadButton();
  enableDownloadWeeklyPricesAndDiscountsFileButton();

  var currentDayData = weeklyPricesAndDiscounts[currentDayIndex];
  var { updatedSkus } = mergeCurrentDayPricesAndDiscountsIntoListGoods(enabledSku, currentDayData);

  await createSkusTable(updatedSkus, "enabled-skus-tbody");
  await weekDaySelectorHandler(enabledSku, weeklyPricesAndDiscounts);

  if (disabledSku.length) {
    enableSkusTable("disabled-skus-table");
    await createSkusTable(disabledSku, "disabled-skus-tbody");
  }
};
