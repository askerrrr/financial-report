var changeInsuranceFeePercentage = async (req, res, next) => {
  var userId = req.app.locals.userId;
  var { percent } = req.body;
  var { changeInsuranceFeePercentageToDb } =
    req.app.locals.taxParamsCollectionServices;

  var successChange = await changeInsuranceFeePercentageToDb(userId, percent);

  if (!successChange) {
    return res.sendStatus(304);
  }

  return res.sendStatus(200);
};

module.exports = changeInsuranceFeePercentage;
