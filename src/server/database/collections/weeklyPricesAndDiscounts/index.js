import { weeklyPricesAndDiscountsCollection } from "../../connections/index.js";
import setUploadId from "./services/setUploadId.js";
import getUploadId from "./services/getUploadId.js";
import updatePriceAndDiscount from "./services/updatePriceAndDiscount.js";
import getWeeklyPricesAndDiscounts from "./services/getWeeklyPricesAndDiscounts.js";
import setWeeklyPricesAndDiscounts from "./services/setWeeklyPricesAndDiscounts.js";
import deleteWeeklyPricesAndDiscounts from "./services/deleteWeeklyPricesAndDiscounts.js";
import getAllUserWeeklyPricesAndDiscounts from "./services/getAllUserWeeklyPricesAndDiscounts.js";
import getTodayPricesAndDiscountsByDayIndex from "./services/getTodayPricesAndDiscountsByDayIndex.js";

var weeklyPricesAndDiscountsCollectionServices = {
  getAllUserWeeklyPricesAndDiscounts: () => getAllUserWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection),
  getWeeklyPricesAndDiscountsFromDb: (userId) => getWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),
  getTodayPricesAndDiscountsByDayIndex: (dayIndex) => getTodayPricesAndDiscountsByDayIndex(weeklyPricesAndDiscountsCollection, dayIndex),

  updatePriceAndDiscount: (userId, skuId, sku, checkedWeekDays) =>
    updatePriceAndDiscount(weeklyPricesAndDiscountsCollection, userId, skuId, sku, checkedWeekDays),

  getUploadId: (userId) => getUploadId(weeklyPricesAndDiscountsCollection, userId),
  setUploadId: (userId, uploadId, session) => setUploadId(weeklyPricesAndDiscountsCollection, userId, uploadId, session),

  setWeeklyPricesAndDiscountsToDb: (userId, weeklyPricesAndDiscounts, session) =>
    setWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId, weeklyPricesAndDiscounts, session),

  deleteWeeklyPricesAndDiscountsFromDb: (userId) => deleteWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),
};

export default weeklyPricesAndDiscountsCollectionServices;
