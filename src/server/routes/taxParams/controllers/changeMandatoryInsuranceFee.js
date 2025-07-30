var changeMandatoryInsuranceFee = async (req, res, next) => {
  var { mandatoryInsuranceFee } = req.body;
  var { changeMandatoryInsuranceFeeToDb } =
    req.app.locals.taxParamsCollectionServices;

  var userId = req.app.locals.userId;

  var successChange = await changeMandatoryInsuranceFeeToDb(
    userId,
    mandatoryInsuranceFee
  );

  if (!successChange) {
    return res.sendStatus(304);
  }

  return res.sendStatus(200);
};

module.exports = changeMandatoryInsuranceFee;
