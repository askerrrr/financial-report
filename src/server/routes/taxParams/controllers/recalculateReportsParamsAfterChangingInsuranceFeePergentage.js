var recalculateReportsParamsAfterChangingInsuranceFeePergentage = async (
  req,
  res,
  next
) => {
  var { year, userId, percent } = req.body;
  var { getTaxParamsFromDb } = req.app.locals.taxParamsCollectionServices;

  var taxParams = await getTaxParamsFromDb(userId, year);

  return res.sendStatus(200);
};

module.exports = recalculateReportsParamsAfterChangingInsuranceFeePergentage;
