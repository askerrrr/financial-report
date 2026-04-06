import { weeklyPricesAndDiscountsCollection } from "../../connections/index.js";
import setUploadId from "./services/setUploadId.js";
import getUploadId from "./services/getUploadId.js";
import updatePriceAndDiscount from "./services/updatePriceAndDiscount.js";
import getWeeklyPricesAndDiscounts from "./services/getWeeklyPricesAndDiscounts.js";
import setWeeklyPricesAndDiscounts from "./services/setWeeklyPricesAndDiscounts.js";
import deleteWeeklyPricesAndDiscounts from "./services/deleteWeeklyPricesAndDiscounts.js";
import getAllUserWeeklyPricesAndDiscounts from "./services/getAllUserWeeklyPricesAndDiscounts.js";

var weeklyPricesAndDiscountsCollectionServices = {
  getWeeklyPricesAndDiscountsFromDb: (userId) => getWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),
  getAllUserWeeklyPricesAndDiscounts: () => getAllUserWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection),

  updatePriceAndDiscount: (userId, sku, checkedWeekDays) => updatePriceAndDiscount(weeklyPricesAndDiscountsCollection, userId, sku, checkedWeekDays),

  getUploadId: (userId) => getUploadId(weeklyPricesAndDiscountsCollection, userId),
  setUploadId: (userId, uploadId) => setUploadId(weeklyPricesAndDiscountsCollection, userId, uploadId),

  setWeeklyPricesAndDiscountsToDb: (userId, weeklyPricesAndDiscounts, session) =>
    setWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId, weeklyPricesAndDiscounts, session),

  deleteWeeklyPricesAndDiscountsFromDb: (userId) => deleteWeeklyPricesAndDiscounts(weeklyPricesAndDiscountsCollection, userId),
};

export default weeklyPricesAndDiscountsCollectionServices;
