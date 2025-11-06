var getListGoodsAndWeeklyPrices = async (req, res, next) => {
  var userId = req.params.userId;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;

  var { listGoods } = await getListGoodsFromDb(userId);

  return res.json({ listGoods });
};

module.exports = getListGoodsAndWeeklyPrices;
