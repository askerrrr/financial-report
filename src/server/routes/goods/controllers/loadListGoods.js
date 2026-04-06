import Joi from "joi";
import listGoodsLoader from "../services/listGoodsLoader.js";

var schema = Joi.object({ userId: Joi.string().required() });

var loadListGoods = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { userId } = req.body;
  var { saveListGoodsToDb } = req.app.locals.goodsCollectionServices;
  var { getWBTokenByUserId } = req.app.locals.tokenCollectionServices;

  var { token } = await getWBTokenByUserId(userId);

  if (!token) {
    return res.status(400).json({ msg: "В первую очередь нужно загрузить токен личного кабинета WB" });
  }

  var { listGoods } = await listGoodsLoader(userId, token);

  var success = await saveListGoodsToDb(userId, listGoods);

  if (success) {
    return res.json({ listGoods });
  }

  return res.sendStatus(304);
};

export default loadListGoods;
