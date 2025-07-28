var getTaxParams = async (req, res, next) => {
  var { getTaxParamsFromDb } = req.app.locals.taxParamsCollectionServices;

  var userId = req.app.locals.userId;

  var options = await getTaxParamsFromDb(userId);

  delete options._id;

  return res.json({ options });
};

module.exports = getTaxParams;
