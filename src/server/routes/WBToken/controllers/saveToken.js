import Joi from "joi";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/collections/index.js";
import listGoodsLoader from "../../goods/services/listGoodsLoader.js";

var schema = Joi.object({ token: Joi.string().required() });

var saveToken = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { token } = req.body;
  var userId = req.app.locals.userId;
  var { saveListGoodsToDb } = dbUtils.goodsCollectionServices;
  var { getWBTokenByUserId, saveWBTokenToDb } = dbUtils.tokenCollectionServices;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var currentToken = (await getWBTokenByUserId(userId)).token;
      
      if (currentToken === token) {
        return res.sendStatus(409);
      }

      await saveWBTokenToDb(userId, token, session);

      var { listGoodsFromWBAPI } = await listGoodsLoader(userId, token);
      await saveListGoodsToDb(userId, listGoodsFromWBAPI, session);
      res.sendStatus(200);
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

export default saveToken;
