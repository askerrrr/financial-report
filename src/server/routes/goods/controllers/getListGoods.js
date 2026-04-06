var getListGoods = async (req, res) => {
  var { userId } = req.params;
  var { getListGoodsFromDb } = req.app.locals.goodsCollectionServices;

  var { listGoods } = await getListGoodsFromDb(userId);
  res.json({ listGoodsLength: listGoods.length, listGoods });
};

export default getListGoods;
