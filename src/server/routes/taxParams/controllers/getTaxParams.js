var excludeFutureTaxParams = require("../services/excludeFutureTaxParams");

var getTaxParams = async (req, res, next) => {
  var { getTaxParamsFromDb } = req.app.locals.taxParamsCollectionServices;

  var userId = req.app.locals.userId;

  var taxParams = await getTaxParamsFromDb(userId);
  var { filteredTaxParams } = excludeFutureTaxParams(taxParams);

  return res.json({ taxParams: filteredTaxParams });
};

module.exports = getTaxParams;
