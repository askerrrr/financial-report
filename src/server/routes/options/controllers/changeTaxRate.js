var changeTaxRate = async (req, res, next) => {
  var { changeTaxRateToDb } = req.app.locals.optionsCollectonServices;

  var { taxRate } = req.body;
  var userId = req.app.locals.userId;

  var successChange = await changeTaxRateToDb(userId, taxRate);

  if (!successChange) {
    return res.sendStatus(304);
  }

  return res.sendStatus(200);
};

module.exports = changeTaxRate;
