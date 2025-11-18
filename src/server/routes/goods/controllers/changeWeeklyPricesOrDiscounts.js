var changeWeeklyPricesOrDiscounts = async (req, res, next) => {
  var { updatePriceAndDiscount } = req.app.locals.weeklyPricesAndDiscountsCollectionServices;

  var { userId, skuId, price, discount, checkedWeekDays } = req.body;
  await updatePriceAndDiscount(userId, skuId, price, discount, checkedWeekDays);
  return res.sendStatus(200);
};

module.exports = changeWeeklyPricesOrDiscounts;
