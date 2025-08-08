var recalculateReportsParamsAfterChangingMandatoryInsuranceFee = async (req, res, next) => {
  var { userId, year } = req.body;
  var { getReportsByUserId } = req.app.locals.reportCollectionServices;
  var { getTaxParamsFromDb } = req.app.locals.taxParamsCollectionServices;

  var reports = await getReportsByUserId(userId);
  var taxParams = await getTaxParamsFromDb(userId, year);

  return res.sendStatus(200);
};

module.exports = recalculateReportsParamsAfterChangingMandatoryInsuranceFee;
