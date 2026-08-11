import dbUtils from "../../../database/collections/index.js";

var changeWeeklyPricesOrDiscounts = async (req, res, next) => {
  var { updatePriceAndDiscount } = dbUtils.weeklyPricesAndDiscountsCollectionServices;

  var { userId, skuId, skuDataToUpdate, checkedWeekDays } = req.body;

  await updatePriceAndDiscount(userId, skuId, skuDataToUpdate, checkedWeekDays);
  return res.sendStatus(200);
};

export default changeWeeklyPricesOrDiscounts;
