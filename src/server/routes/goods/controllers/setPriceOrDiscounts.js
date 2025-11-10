var setPriceOrDiscounts = async (req, res, next) => {
  var { updatePriceAnddDiscount } = req.app.locals.weeklyPricesAndDiscountsCollectionServices;

  var { userId, skuId, price, discount, checkedWeekDays } = req.body;
  await updatePriceAnddDiscount(userId, skuId, price, discount, checkedWeekDays);
  return res.sendStatus(200);
};

module.exports = setPriceOrDiscounts;
