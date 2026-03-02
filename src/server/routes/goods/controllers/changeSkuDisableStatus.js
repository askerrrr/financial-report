var Joi = require("joi");

var schema = Joi.object({
  userId: Joi.string().required(),
  skuName: Joi.string().required(),
  disableStatus: Joi.boolean().required(),
  nmID: Joi.number(),
});

var changeSkuDisableStatus = async (req, res, next) => {
  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  var { updateSkuDisableStatusToDb } = req.app.locals.goodsCollectionServices;
  var { userId, skuName, disableStatus } = req.body;
  var success = await updateSkuDisableStatusToDb(userId, skuName, disableStatus);

  if (!success) {
    return res.sendStatus(304);
  }

  return res.sendStatus(200);
};

module.exports = changeSkuDisableStatus;
