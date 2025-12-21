var { connection } = require("../../../database/");

var deleteReport = async (req, res, next) => {
  var { reportTotals } = req.body;
  var { deleteReportFromDb } = req.app.locals.reportCollectionServices;
  var { deleteReportFromReportTree } = req.app.locals.reportsTreeCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var session = await connection.startSession();

  try {
    await session.withTransaction(async () => {
      var { userId } = reportTotals;
      var { year, month } = reportTotals.recordTo;

      if (reportTotals.crossesTaxYears) {
        var startYear = +reportTotals.dateFrom.split("-")[0];
        var endYear = +reportTotals.dateTo.split("-")[0];

        var taxParams = await getTaxParamsFromDb(userId, null, session);
        var startYearTaxParams = taxParams.find((params) => params.year === startYear);
        var endYearTaxParams = taxParams.find((params) => params.year === endYear);

        startYearTaxParams.paidTaxAmount -= reportTotals.totalTaxAmountInCurrentYear;
        startYearTaxParams.retailAmount -= reportTotals.totalRetailAmountInCurrentYear;
        startYearTaxParams.paidInsuranceFee -= reportTotals.totalInsuranceFeeInCurrentYear;
        startYearTaxParams.additionalInsuranceFee -= reportTotals.totalAdditionalInsuranceFeeInCurrentYear;

        endYearTaxParams.paidTaxAmount -= reportTotals.totalTaxAmountInNextYear;
        endYearTaxParams.retailAmount -= reportTotals.totalRetailAmountInNextYear;
        endYearTaxParams.paidInsuranceFee -= reportTotals.totalInsuranceFeeInNextYear;
        endYearTaxParams.additionalInsuranceFee -= reportTotals.totalAdditionalInsuranceFeeInNextYear;

        await changeTaxParamsToDb(userId, startYear, session, startYearTaxParams);
        await changeTaxParamsToDb(userId, endYear, session, endYearTaxParams);
      } else {
        var taxParams = await getTaxParamsFromDb(userId, year, session);

        taxParams.paidTaxAmount -= reportTotals.totalTaxAmount;
        taxParams.retailAmount -= reportTotals.totalRetailAmount;
        taxParams.paidInsuranceFee -= reportTotals.totalInsuranceFee;

        await changeTaxParamsToDb(userId, year, session, taxParams);
      }

      await deleteReportFromDb(userId, reportTotals.reportId, session);
      await deleteReportFromReportTree(userId, year, month, reportTotals.reportId, session);
    });

    return res.sendStatus(200);
  } catch (e) {
    res.sendStatus(304);
  } finally {
    await session.endSession();
  }
};

module.exports = deleteReport;
