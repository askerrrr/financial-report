import dbUtils from "../../../database/collections/index.js";
import excludeFutureTaxParams from "../services/excludeFutureTaxParams.js";

var getTaxParams = async (req, res, next) => {
  var { getTaxParamsFromDb } = dbUtils.taxParamsCollectionServices;

  var userId = req.app.locals.userId;

  var taxParams = await getTaxParamsFromDb(userId);
  var { filteredTaxParams } = excludeFutureTaxParams(taxParams);

  return res.json({ taxParams: filteredTaxParams });
};

export default getTaxParams;
