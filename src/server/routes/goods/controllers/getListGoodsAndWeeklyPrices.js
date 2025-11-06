var getListGoodsAndWeeklyPrices = async (req, res, next) => {
  var userId = req.params.userId;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;
  var { getWeeklyPricesAndDiscountsFromDb } = req.app.locals.weeklyPricesAndDiscountsCollectionServices;

  var { listGoods } = await getListGoodsFromDb(userId);
  var { weeklyPricesAndDiscounts } = await getWeeklyPricesAndDiscountsFromDb(userId);

  return res.json({ listGoods, weeklyPricesAndDiscounts });
};

module.exports = getListGoodsAndWeeklyPrices;
