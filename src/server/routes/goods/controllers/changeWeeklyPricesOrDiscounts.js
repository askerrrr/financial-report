var changeWeeklyPricesOrDiscounts = async (req, res, next) => {
  var { updatePriceAndDiscount } = req.app.locals.weeklyPricesAndDiscountsCollectionServices;

  var { userId, sku, checkedWeekDays } = req.body;
  await updatePriceAndDiscount(userId, sku, checkedWeekDays);
  return res.sendStatus(200);
};

export default changeWeeklyPricesOrDiscounts;
