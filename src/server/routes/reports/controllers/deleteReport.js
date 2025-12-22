var { connection } = require("../../../database/");

var deleteReport = async (req, res, next) => {
  var { report } = req.body;
  var { deleteReportFromDb } = req.app.locals.reportCollectionServices;
  var { deleteReportFromReportTree } = req.app.locals.reportsTreeCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var session = await connection.startSession();

  try {
    await session.withTransaction(async () => {
      var { userId } = report;
      var { year, month } = report.recordTo;

      if (report.crossesTaxYears) {
        var startYear = +report.dateFrom.split("-")[0];
        var endYear = +report.dateTo.split("-")[0];

        var taxParams = await getTaxParamsFromDb(userId, null, session);
        var startYearTaxParams = taxParams.find((params) => params.year === startYear);
        var endYearTaxParams = taxParams.find((params) => params.year === endYear);

        startYearTaxParams.finalProfit -= report.totalFinalProfitInCurrentYear;
        startYearTaxParams.paidTaxAmount -= report.totalTaxAmountInCurrentYear;
        startYearTaxParams.retailAmount -= report.totalRetailAmountInCurrentYear;
        startYearTaxParams.paidInsuranceFee -= report.totalInsuranceFeeInCurrentYear;
        startYearTaxParams.additionalInsuranceFee -= report.totalAdditionalInsuranceFeeInCurrentYear;

        endYearTaxParams.finalProfit -= report.totalFinalProfitInNextYear;
        endYearTaxParams.paidTaxAmount -= report.totalTaxAmountInNextYear;
        endYearTaxParams.retailAmount -= report.totalRetailAmountInNextYear;
        endYearTaxParams.paidInsuranceFee -= report.totalInsuranceFeeInNextYear;
        endYearTaxParams.additionalInsuranceFee -= report.totalAdditionalInsuranceFeeInNextYear;

        await changeTaxParamsToDb(userId, startYear, session, startYearTaxParams);
        await changeTaxParamsToDb(userId, endYear, session, endYearTaxParams);
      } else {
        var taxParams = await getTaxParamsFromDb(userId, year, session);

        taxParams.finalProfit -= report.totalFinalProfit;
        taxParams.paidTaxAmount -= report.totalTaxAmount;
        taxParams.retailAmount -= report.totalRetailAmount;
        taxParams.paidInsuranceFee -= report.totalInsuranceFee;
        taxParams.additionalInsuranceFee -= report.totalAdditionalInsuranceFee;

        await changeTaxParamsToDb(userId, year, session, taxParams);
      }

      await deleteReportFromDb(userId, report.reportId, session);
      await deleteReportFromReportTree(userId, year, month, report.reportId, session);
    });

    return res.sendStatus(200);
  } catch (e) {
    res.sendStatus(304);
  } finally {
    await session.endSession();
  }
};

module.exports = deleteReport;
