import Joi from "joi";
import listGoodsLoader from "../services/listGoodsLoader.js";
import dbUtils from "../../../database/collections/index.js";

var schema = Joi.object({ userId: Joi.string().required() });

var loadListGoods = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { userId } = req.body;
  var { saveListGoodsToDb } = dbUtils.goodsCollectionServices;
  var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;

  var { token } = await getWBTokenByUserId(userId);

  if (!token) {
    return res.status(400).json({ msg: "В первую очередь нужно загрузить токен личного кабинета WB" });
  }

  var { listGoodsFromWBAPI } = await listGoodsLoader(userId, token);

  var success = await saveListGoodsToDb(userId, listGoodsFromWBAPI);

  if (success) {
    return res.json({ listGoods: listGoodsFromWBAPI });
  }

  return res.sendStatus(304);
};

export default loadListGoods;
