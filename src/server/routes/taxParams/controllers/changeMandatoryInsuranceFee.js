var changeMandatoryInsuranceFee = async (req, res, next) => {
  var { year, mandatoryInsuranceFee } = req.body;
  var { changeMandatoryInsuranceFeeToDb } = req.app.locals.taxParamsCollectionServices;

  var userId = req.app.locals.userId;

  var success = await changeMandatoryInsuranceFeeToDb(userId, year, mandatoryInsuranceFee);

  if (!success) {
    return res.sendStatus(304);
  }
  return res.sendStatus(200);
  req.body = { userId, year };

  next();
};

module.exports = changeMandatoryInsuranceFee;
