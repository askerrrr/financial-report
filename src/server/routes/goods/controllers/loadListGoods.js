var wbapi = require("../../reports/services/WBAPI");

var loadListGoods = async (req, res, next) => {
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var userId = req.app.locals.userId;

  var token = await getWBTokenByUserId(userId);

  var { listGoods } = await wbapi.getListGoods(userId, token);
  //parseListGood(listGoods)
  //saveListGoodsToDb(userId, listGoods)
};

module.exports = loadListGoods;
