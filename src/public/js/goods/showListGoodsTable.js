import setThColSpan from "./utils/setThColSpan.js";
import getGoodsData from "./utils/getGoodsData.js";
import createSkusTable from "./utils/createSkusTableNew.js";
import getCurrentDayMSK from "./utils/getCurrentDayMSK.js";
import switchToActiveTable from "./utils/switchToActiveTable.js";
import getCheckedSkuCheckboxes from "./utils/getCheckedSkuCheckboxes.js";
import weekDaySelectorHandler from "./utils/weekDaySelector/index.js";
import multipleDisableHandling from "./utils/multipleDisableHandling.js";
import loadListGoodsButtonHandler from "./loadListGoodsButtonHandler.js";
import prependHeaderRowToTbody from "./utils/prependHeaderRowToTbody.js";
import setWeekDaySelectorToCurrentDay from "./utils/setWeekDaySelectorToCurrentDay.js";
import addTableHeadRowToCheckboxForParticipationInPromo from "./utils/addTableHeadRowToCheckboxForParticipationInPromo.js";
import {
  toggleTableScrollVisibillity,
  toggleSkuTableVisibillity,
  toggleWeekDaysSelectorVisibility,
  toggleUploadListGoodsButtonVisibility,
  toggleSkusMetricsFileUploadButtonVisibility,
  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility,
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility,
} from "./utils/visibilityToggle/index.js";

var { currentDayName, currentDayIndex } = getCurrentDayMSK();

var showListGoodsTable = async () => {
  var { listGoods, weeklyPricesAndDiscounts } = await getGoodsData();
  var { enabledSku, disabledSku } = listGoods;

  switchToActiveTable(enabledSku, disabledSku);

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
  // toggleUploadListGoodsButtonVisibility("enable");
  loadListGoodsButtonHandler();

  toggleTableScrollVisibillity("enabled-skus-table-scroll", "disable");
  toggleTableScrollVisibillity("disabled-skus-table-scroll", "disable");
};

var handleEmptyEnabledSkus = async function (disabledSku) {
  toggleSkusMetricsFileUploadButtonVisibility("enable");
  toggleTableScrollVisibillity("enabled-skus-table-scroll", "disable");
  toggleTableScrollVisibillity("disabled-skus-table-scroll", "enable");

  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");
  await createSkusTable(disabledSku, "disabled-skus-tbody");
};

var handleNonEmptyEnabledSkus = async function ({ enabledSku, disabledSku }) {
  setWeekDaySelectorToCurrentDay(currentDayName);

  toggleTableScrollVisibillity("enabled-skus-table-scroll", "enable");
  toggleSkuTableVisibillity("enabled-skus-table", "enable");
  toggleSkusMetricsFileUploadButtonVisibility("enable");
  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");

  await createSkusTable(enabledSku, "enabled-skus-tbody");

  if (disabledSku.length) {
    toggleTableScrollVisibillity("disabled-skus-table-scroll", "enable");

    await createSkusTable(disabledSku, "disabled-skus-tbody");
  } else {
    toggleTableScrollVisibillity("disabled-skus-table-scroll", "disable");
  }
};

var handleNonEmptyWeeklyPricesAndDiscounts = async function (
  { enabledSku, disabledSku },
  weeklyPricesAndDiscounts,
) {
  // setThColSpan();
  // prependHeaderRowToTbody();
  toggleWeekDaysSelectorVisibility("enable");
  toggleSkuTableVisibillity("enabled-skus-table", "enable");
  setWeekDaySelectorToCurrentDay(currentDayName);
  toggleSkusMetricsFileUploadButtonVisibility("enable");
  // addTableHeadRowToCheckboxForParticipationInPromo();
  toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility("enable");
  toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility("enable");

  var currentDayData = weeklyPricesAndDiscounts[currentDayIndex];
  console.log(currentDayData)
  await createSkusTable(enabledSku, "enabled-skus-tbody", currentDayData);
  await weekDaySelectorHandler(
    enabledSku,
    weeklyPricesAndDiscounts,
    currentDayIndex,
  );

  if (disabledSku.length) {
    await createSkusTable(disabledSku, "disabled-skus-tbody", currentDayData);
  }
};
