var getWeeklyPricesFile = async (req, res, next) => {
  var { userId } = req.params;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;

  var { listGoods } = await getListGoodsFromDb(userId);
};

module.exports = getWeeklyPricesFile;
