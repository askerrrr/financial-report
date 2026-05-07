import Joi from "joi";
import wbapi from "../../reports/services/WBAPI/index.js";
import dbUtils from "../../../database/collections/index.js";

var checkedWeekDaysArraySchema = Joi.array().items(Joi.number().required()).required();
var skuObjectSchema = Joi.object({ nmID: Joi.number().required(), price: Joi.number().required(), discount: Joi.number().required() });

var schema = Joi.object({
  sku: skuObjectSchema,
  userId: Joi.string().required(),
  setNewPriceNow: Joi.boolean().required(),
  expectedPriceExists: Joi.boolean().required(),
  checkedWeekDays: checkedWeekDaysArraySchema,
});

var setNewPricesAndDiscountsToSku = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { updateSingleSku } = dbUtils.goodsCollectionServices;
  var { getWBTokenByUserId } = dbUtils.tokenCollectionServices;
  var { userId, sku, setNewPriceNow, expectedPriceExists } = req.body;

  if (setNewPriceNow) {
    var { token } = await getWBTokenByUserId(userId);
    var data = [{ ...sku }];

    await updateSingleSku(userId, sku);
    await wbapi.setPricesAndDiscounts(userId, token, data);
  }

  if (!expectedPriceExists) {
    return res.sendStatus(200);
  }

  next();
};

export default setNewPricesAndDiscountsToSku;
