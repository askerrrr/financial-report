var changeMandatoryInsuranceFee = async (req, res, next) => {
  var { year, mandatoryInsuranceFee } = req.body;
  var { changeMandatoryInsuranceFeeToDb } =
    req.app.locals.taxParamsCollectionServices;

  var userId = req.app.locals.userId;

  var successChange = await changeMandatoryInsuranceFeeToDb(
    userId,
    year,
    mandatoryInsuranceFee
  );

  if (!successChange) {
    return res.sendStatus(304);
  }

  return res.sendStatus(200);
};

module.exports = changeMandatoryInsuranceFee;
