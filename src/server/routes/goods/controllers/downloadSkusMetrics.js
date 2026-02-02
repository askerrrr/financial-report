var downloadSkusMetrics = async (req, res, next) => {
  var { userId } = req.app.locals;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;

  var { listGoods } = await getListGoodsFromDb(userId);

  //   var skuMetricsFile = await generageSKuMetricsFile(listGoods);
};

module.exports = downloadSkusMetrics;
