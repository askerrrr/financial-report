import Joi from "joi";
import { dbClient } from "../../../database/index.js";
import getTokenDetails from "../services/getTokenDetails.js";
import dbUtils from "../../../database/collections/index.js";
import listGoodsLoader from "../../goods/services/listGoodsLoader.js";
import extractNewSkusFromLIstGoods from "../../goods/services/extractNewSkusFromLIstGoods.js";

var schema = Joi.object({ token: Joi.string().required() });

var saveToken = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { token } = req.body;
  var userId = req.app.locals.userId;
  var { getWBTokenByUserId, saveWBTokenToDb } = dbUtils.tokenCollectionServices;
  var { saveListGoodsToDb, getListGoodsFromDb, saveNewSkusToDb } = dbUtils.goodsCollectionServices;

  var session = await dbClient.startSession();

  try {
    await session.withTransaction(async () => {
      var currentToken = (await getWBTokenByUserId(userId)).token;

      if (currentToken === token) {
        return res.sendStatus(409);
      }

      await saveWBTokenToDb(userId, token, session);

      var { listGoods } = await getListGoodsFromDb(userId, session);
      var { listGoodsFromWBAPI } = await listGoodsLoader(userId, token);

      if (!listGoods.length) {
        await saveListGoodsToDb(userId, listGoodsFromWBAPI, session);
      } else {
        var { newSkus } = extractNewSkusFromLIstGoods(listGoodsFromWBAPI, listGoods);
        await saveNewSkusToDb(userId, newSkus, session);
      }

      var tokenData = getTokenDetails(token);

      res.json(tokenData);
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
