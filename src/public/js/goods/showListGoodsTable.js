import setThColSpan from "./utils/setThColSpan.js";
import getGoodsData from "./utils/getGoodsData.js";
import createSkusTable from "./utils/createSkusTable.js";
import getCurrentDayMSK from "./utils/getCurrentDayMSK.js";
import weekDaySelectorHandler from "./utils/weekDaySelector/index.js";
import loadListGoodsButtonHandler from "./loadListGoodsButtonHandler.js";
import prependHeaderRowToTbody from "./utils/prependHeaderRowToTbody.js";
import setWeekDaySelectorToCurrentDay from "./utils/setWeekDaySelectorToCurrentDay.js";
import addTableHeadRowToCheckboxForParticipationInPromo from "./utils/addTableHeadRowToCheckboxForParticipationInPromo.js";
import {
  toggleSkuTableVisibillity,
  toggleWeekDaysSelectorVisibility,
  toggleDisabledSkusButtonVisibility,
  toggleUploadListGoodsButtonVisibility,
  toggleSkusMetricsFileUploadButtonVisibility,
  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility,
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility,
} from "./utils/visibilityToggle/index.js";

var { currentDayName, currentDayIndex } = getCurrentDayMSK();

var showListGoodsTable = async () => {
  var { listGoods, weeklyPricesAndDiscounts } = await getGoodsData();
  var { enabledSku, disabledSku } = listGoods;

  if (!enabledSku.length && !disabledSku.length) {
    handleEmptySkus();
    return;
  }

  if (!enabledSku.length && disabledSku.length) {
    await handleEmptyEnabledSkus(disabledSku);
    return;
  }

  if (weeklyPricesAndDiscounts.length) {
    await handleNonEmptyWeeklyPricesAndDiscounts(
      listGoods,
      weeklyPricesAndDiscounts,
    );
    return;
  }

  handleNonEmptyEnabledSkus(listGoods);
};

export default showListGoodsTable;

var handleEmptySkus = function () {
  toggleUploadListGoodsButtonVisibility("enable");
  loadListGoodsButtonHandler();
};

var handleEmptyEnabledSkus = async function (disabledSku) {
  toggleDisabledSkusButtonVisibility("enable");
  toggleSkusMetricsFileUploadButtonVisibility("enable");

  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");
  await createSkusTable(disabledSku, "disabled-skus-tbody");
};

var handleNonEmptyEnabledSkus = async function ({ enabledSku, disabledSku }) {
  setWeekDaySelectorToCurrentDay(currentDayName);
  toggleSkuTableVisibillity("enabled-skus-table", "enable");
  toggleSkusMetricsFileUploadButtonVisibility("enable");
  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");
  await createSkusTable(enabledSku, "enabled-skus-tbody");

  if (disabledSku.length) {
    toggleDisabledSkusButtonVisibility("enable");
    await createSkusTable(disabledSku, "disabled-skus-tbody");
  }
};

var handleNonEmptyWeeklyPricesAndDiscounts = async function (
  { enabledSku, disabledSku },
  weeklyPricesAndDiscounts,
) {
  setThColSpan();
  prependHeaderRowToTbody();
  toggleWeekDaysSelectorVisibility("enable");
  toggleSkuTableVisibillity("enabled-skus-table", "enable");
  setWeekDaySelectorToCurrentDay(currentDayName);
  toggleSkusMetricsFileUploadButtonVisibility("enable");
  addTableHeadRowToCheckboxForParticipationInPromo();
  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");

  var currentDayData = weeklyPricesAndDiscounts[currentDayIndex];

  await createSkusTable(enabledSku, "enabled-skus-tbody", currentDayData);
  await weekDaySelectorHandler(
    enabledSku,
    weeklyPricesAndDiscounts,
    currentDayIndex,
  );

  if (disabledSku.length) {
    toggleDisabledSkusButtonVisibility("enable");
    await createSkusTable(disabledSku, "disabled-skus-tbody", currentDayData);
  }
};
