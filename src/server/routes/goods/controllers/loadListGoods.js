var wbapi = require("../../reports/services/WBAPI");
var extractRequiredListGoodsData = require("../services/extractRequiredListGoodsData");

var loadListGoods = async (req, res, next) => {
  var { saveListGoodsToDb } = req.app.locals.goodsCollectionServices;
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var userId = req.app.locals.userId;

  var token = await getWBTokenByUserId(userId);

  var { rawListGoogs } = await wbapi.getListGoods(userId, token);

  var { listGoods } = await extractRequiredListGoodsData(rawListGoogs);

  var success = await saveListGoodsToDb(userId, listGoods);

  if (success) {
    return res.sendStatus(200);
  }
};

module.exports = loadListGoods;
