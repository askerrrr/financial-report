var downloadSkusMetrics = async (req, res, next) => {
  var { userId } = req.app.locals;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;

  var { listGoods } = await getListGoodsFromDb(userId);

  //   var skusMetricsFile = await generageSKusMetricsFile(listGoods);
};

module.exports = downloadSkusMetrics;
