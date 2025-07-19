var changeTaxRate = async (req, res, next) => {
  var { taxRate } = req.body;
  var userId = req.app.locals.userId;
};

module.exports = changeTaxRate;
