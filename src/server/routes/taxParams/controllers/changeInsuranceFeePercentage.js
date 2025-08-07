var changeInsuranceFeePercentage = async (req, res, next) => {
  var userId = req.app.locals.userId;
  var { year, percent, recalculate } = req.body;
  var { changeInsuranceFeePercentageToDb } =
    req.app.locals.taxParamsCollectionServices;
  console.log(req.body);
  var success = await changeInsuranceFeePercentageToDb(userId, year, percent);

  if (!success) {
    return res.sendStatus(304);
  }

  if (!recalculate) {
    return res.sendStatus(200);
  }

  req.year = year;
  req.percent = percent;

  next();
};

module.exports = changeInsuranceFeePercentage;
