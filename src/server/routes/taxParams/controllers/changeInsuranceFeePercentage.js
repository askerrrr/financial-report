var changeInsuranceFeePercentage = async (req, res, next) => {
  var userId = req.app.locals.userId;
  var { year, percent, recalculate } = req.body;
  var { changeInsuranceFeePercentageToDb } = req.app.locals.taxParamsCollectionServices;

  var success = await changeInsuranceFeePercentageToDb(userId, year, percent);

  if (!success) {
    return res.sendStatus(304);
  }

  if (!recalculate) {
    return res.sendStatus(200);
  }
  return res.sendStatus(200);
  req.body = { year, userId, percent };
  next();
};

module.exports = changeInsuranceFeePercentage;
