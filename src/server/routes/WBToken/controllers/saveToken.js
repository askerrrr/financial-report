var { connection } = require("../../../database");
var listGoodsLoader = require("../../goods/services/listGoodsLoader");

var saveToken = async (req, res, next) => {
  var { token } = req.body;
  var userId = req.app.locals.userId;
  var { saveListGoodsToDb } = req.app.locals.goodsCollectionServices;
  var { saveWBTokenToDb, getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var session = await connection.startSession();

  try {
    await session.withTransaction(async () => {
      var currentToken = await getWBTokenByUserId(userId);

      if (currentToken === token) {
        return res.sendStatus(409);
      }

      await saveWBTokenToDb(userId, token, session);

      var { listGoods } = await listGoodsLoader(userId, token);
      await saveListGoodsToDb(userId, listGoods, session);
    });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

module.exports = saveToken;
