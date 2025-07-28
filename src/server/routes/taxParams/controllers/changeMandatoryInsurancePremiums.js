var changeMandatoryInsurancePremiums = async (req, res, next) => {
  var { mandatoryInsurancePremiums } = req.body;
  var { changeMandatoryInsurancePremiumsToDb } =
    req.app.locals.taxParamsCollectionServices;

  var userId = req.app.locals.userId;

  var successChange = await changeMandatoryInsurancePremiumsToDb(
    userId,
    mandatoryInsurancePremiums
  );

  if (!successChange) {
    return res.sendStatus(304);
  }

  return res.sendStatus(200);
};

module.exports = changeMandatoryInsurancePremiums;
