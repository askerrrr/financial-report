var changeTaxRate = async (req, res, next) => {
  var userId = req.app.locals.userId;
  var { taxRate, recalculate } = req.body;
  var { changeTaxRateToDb } = req.app.locals.taxParamsCollectionServices;

  var successChange = await changeTaxRateToDb(userId, taxRate);

  if (!successChange) {
    return res.sendStatus(304);
  }

  if (!recalculate) {
    return res.sendStatus(200);
  }

  req.taxRate = taxRate;
  next();
};

module.exports = changeTaxRate;
