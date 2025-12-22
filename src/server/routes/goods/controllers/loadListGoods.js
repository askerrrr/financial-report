var listGoodsLoader = require("../services/listGoodsLoader");

var loadListGoods = async (req, res, next) => {
  var { userId } = req.body;
  var { saveListGoodsToDb } = req.app.locals.goodsCollectionServices;
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var { token } = await getWBTokenByUserId(userId);

  if (!token) {
    return res.sendStatus(304);
  }

  var { listGoods } = await listGoodsLoader(userId, token);

  var success = await saveListGoodsToDb(userId, listGoods);

  if (success) {
    return res.json({ listGoods });
  }

  return res.sendStatus(304);
};

module.exports = loadListGoods;
