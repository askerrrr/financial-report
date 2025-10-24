var wbapi = require("../../reports/services/WBAPI");
var extractRequiredListGoodsData = require("../services/extractRequiredListGoodsData");

var loadListGoods = async (req, res, next) => {
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var userId = req.app.locals.userId;

  var token = await getWBTokenByUserId(userId);

  var { rawListGoogs } = await wbapi.getListGoods(userId, token);
  var listGoogs = await extractRequiredListGoodsData(rawListGoogs);
  //saveListGoodsToDb(userId, listGoods)
};

module.exports = loadListGoods;
