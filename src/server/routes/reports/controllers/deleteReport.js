var deleteReport = async (req, res, next) => {
  var { deleteReportFromDb } = req.app.locals.reportCollectionServices;
  var { deleteReportFromReportTree } = req.app.locals.reportsTreeCollectionServices;
  var { getTaxParamsFromDb, changePaidTaxAmountToDb, changePaidInsuranceFeeToDb } = req.app.locals.taxParamsCollectionServices;

  var { userId, reportId, year, month, totalTaxAmount, totalInsuranceFee } = req.body;

  var deletedFromTree = await deleteReportFromReportTree(userId, year, month, reportId);

  var deleteFromReports = await deleteReportFromDb(userId, reportId);

  var taxParams = await getTaxParamsFromDb(userId, year);

  taxParams.paidTaxAmount -= totalTaxAmount;
  taxParams.paidInsuranceFee -= totalInsuranceFee;

  await changePaidTaxAmountToDb(userId, year, taxParams.paidTaxAmount);
  await changePaidInsuranceFeeToDb(userId, year, taxParams.paidInsuranceFee);

  return deleteFromReports && deletedFromTree ? res.sendStatus(200) : res.sendStatus(304);
};

module.exports = deleteReport;
