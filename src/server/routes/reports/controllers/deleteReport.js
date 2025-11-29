var { connection } = require("../../../database/");

var deleteReport = async (req, res, next) => {
  var { deleteReportFromDb } = req.app.locals.reportCollectionServices;
  var { deleteReportFromReportTree } = req.app.locals.reportsTreeCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;
  var { userId, reportId, year, month, totalTaxAmount, totalInsuranceFee } = req.body;

  var session = await connection.startSession();

  try {
    await session.withTransaction(async () => {
      var taxParams = await getTaxParamsFromDb(userId, year, session);

      taxParams.paidTaxAmount -= totalTaxAmount;
      taxParams.paidInsuranceFee -= totalInsuranceFee;

      var { paidTaxAmount, paidInsuranceFee } = taxParams;
      var recalculatedTaxParams = { paidTaxAmount, paidInsuranceFee };

      await deleteReportFromDb(userId, reportId, session);
      await changeTaxParamsToDb(userId, year, session, recalculatedTaxParams);
      await deleteReportFromReportTree(userId, year, month, reportId, session);
    });

    return res.sendStatus(200);
  } catch (e) {
    res.sendStatus(304);
  } finally {
    await session.endSession();
  }
};

module.exports = deleteReport;
