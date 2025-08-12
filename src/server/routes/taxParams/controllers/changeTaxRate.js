var changeTaxRate = async (req, res, next) => {
  var userId = req.app.locals.userId;
  var { taxRate, recalculate, year } = req.body;
  var { changeTaxRateToDb } = req.app.locals.taxParamsCollectionServices;

  var successChange = await changeTaxRateToDb(userId, year, taxRate);

  if (!successChange) {
    return res.sendStatus(304);
  }

  if (!recalculate) {
    return res.sendStatus(200);
  }

  return res.sendStatus(200);
  req.body = { year, userId, taxRate };

  next();
};

module.exports = changeTaxRate;
