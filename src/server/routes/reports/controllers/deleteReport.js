var { connection } = require("../../../database/");

var deleteReport = async (req, res, next) => {
  var { deleteReportFromDb } = req.app.locals.reportCollectionServices;
  var { deleteReportFromReportTree } = req.app.locals.reportsTreeCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;
  var { userId, reportId, year, month, totalTaxAmount, totalInsuranceFee } = req.body;

  var taxParams = await getTaxParamsFromDb(userId, year);

  var session = await connection.startSession();

  try {
    session.startTransaction();

    taxParams.paidTaxAmount -= totalTaxAmount;
    taxParams.paidInsuranceFee -= totalInsuranceFee;
    var { paidTaxAmount, paidInsuranceFee } = taxParams;

    var deleteFromReports = await deleteReportFromDb(userId, reportId, session);
    var deletedFromTree = await deleteReportFromReportTree(userId, year, month, reportId, session);
    var taxParamsUpdated = await changeTaxParamsToDb(userId, year, session, {
      paidTaxAmount,
      paidInsuranceFee,
    });

    if (!deleteFromReports || !deletedFromTree || !taxParamsUpdated) {
      throw new Error("");
    }

    await session.commitTransaction();

    return res.sendStatus(200);
  } catch (e) {
    await session.abortTransaction();
    res.sendStatus(304);
  } finally {
    await session.endSession();
  }
};

module.exports = deleteReport;
