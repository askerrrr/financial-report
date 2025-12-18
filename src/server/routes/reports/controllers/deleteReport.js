var { connection } = require("../../../database/");

var deleteReport = async (req, res, next) => {
  var { deleteReportFromDb } = req.app.locals.reportCollectionServices;
  var { deleteReportFromReportTree } = req.app.locals.reportsTreeCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;
  var {
    userId,
    reportId,
    dateFrom,
    dateTo,
    year,
    month,
    isCrossYearReport,
    totalInsuranceFee,
    totalInsuranceFeeInCurrentYear,
    totalInsuranceFeeInNextYear,
    totalTaxAmount,
    totalTaxAmountInCurrentYear,
    totalTaxAmountInNextYear,
  } = req.body;

  var session = await connection.startSession();

  try {
    await session.withTransaction(async () => {
      if (isCrossYearReport) {
        var startYear = +dateFrom.split("-")[0];
        var endYear = +dateTo.split("-")[0];

        var taxParams = await getTaxParamsFromDb(userId, null, session);
        var startYearTaxParams = taxParams.find((params) => params.year === startYear);
        var endYearTaxParams = taxParams.find((params) => params.year === endYear);

        startYearTaxParams.paidTaxAmount -= totalTaxAmountInCurrentYear;
        startYearTaxParams.paidInsuranceFee -= totalInsuranceFeeInCurrentYear;

        endYearTaxParams.paidTaxAmount -= totalTaxAmountInNextYear;
        endYearTaxParams.paidInsuranceFee -= totalInsuranceFeeInNextYear;

        await changeTaxParamsToDb(userId, startYear, session, startYearTaxParams);
        await changeTaxParamsToDb(userId, endYear, session, endYearTaxParams);
      } else {
        var taxParams = await getTaxParamsFromDb(userId, year, session);

        taxParams.paidTaxAmount -= totalTaxAmount;
        taxParams.paidInsuranceFee -= totalInsuranceFee;

        await changeTaxParamsToDb(userId, year, session, taxParams);
      }

      await deleteReportFromDb(userId, reportId, session);
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
