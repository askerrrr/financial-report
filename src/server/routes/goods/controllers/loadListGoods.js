var wbapi = require("../../reports/services/WBAPI");
var extractRequiredListGoodsData = require("../services/extractRequiredListGoodsData");

var loadListGoods = async (req, res, next) => {
  var { userId } = req.body;
  var { saveListGoodsToDb } = req.app.locals.goodsCollectionServices;
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var token = await getWBTokenByUserId(userId);

  var { rawListGoogs } = await wbapi.getListGoods(userId, token);

  var { listGoods } = await extractRequiredListGoodsData(rawListGoogs);

  var success = await saveListGoodsToDb(userId, listGoods);

  if (success) {
    return res.json({ listGoods });
  }

  return res.sendStatus(304);
};

module.exports = loadListGoods;
