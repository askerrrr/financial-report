var getTaxParamKeyName = require("../services/getTaxParamKeyName");
var defaultTaxParams = require("../../../database/defaultTaxParams");

var changeTaxParams = async (req, res, next) => {
  var userId = req.app.locals.userId;
  var { year, recalculate, data } = req.body;
  var { changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var success = await changeTaxParamsToDb(userId, year, (session = null), data);

  if (success) {
    return res.sendStatus(200);
  }

  return res.sendStatus(304);
};

module.exports = changeTaxParams;
