var getTaxParams = async (req, res, next) => {
  var { getTaxParamsFromDb } = req.app.locals.taxParamsCollectionServices;

  var userId = req.app.locals.userId;

  var taxParams = await getTaxParamsFromDb(userId);

  return res.json({ taxParams });
};

module.exports = getTaxParams;
