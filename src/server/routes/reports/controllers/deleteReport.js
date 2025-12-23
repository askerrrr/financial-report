var { dbClient } = require("../../../database/");

var deleteReport = async (req, res, next) => {
  var { report } = req.body;
  var { deleteReportFromDb } = req.app.locals.reportCollectionServices;
  var { deleteReportFromReportTree } = req.app.locals.reportsTreeCollectionServices;
  var { getTaxParamsFromDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

  var session = await dbClient.startSession();

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

        startYearTaxParams = recalculateTaxParams(startYearTaxParams, report, "InCurrentYear").updatedTaxParams;
        endYearTaxParams = recalculateTaxParams(endYearTaxParams, report, "InNextYear").updatedTaxParams;

        await changeTaxParamsToDb(userId, startYear, session, startYearTaxParams);
        await changeTaxParamsToDb(userId, endYear, session, endYearTaxParams);
      } else {
        var taxParams = await getTaxParamsFromDb(userId, year, session);
        var { updatedTaxParams } = recalculateTaxParams(taxParams, report);
        await changeTaxParamsToDb(userId, year, session, updatedTaxParams);
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

var recalculateTaxParams = function (taxParams, report, propPostfix = "") {
  taxParams.finalProfit = (taxParams.finalProfit - report["totalFinalProfit" + propPostfix]).toFixed(2);
  taxParams.paidTaxAmount = (taxParams.paidTaxAmount - report["totalTaxAmount" + propPostfix]).toFixed(2);
  taxParams.retailAmount = (taxParams.retailAmount - report["totalRetailAmount" + propPostfix]).toFixed(2);
  taxParams.paidInsuranceFee = (taxParams.paidInsuranceFee - report["totalInsuranceFee" + propPostfix]).toFixed(2);
  taxParams.additionalInsuranceFee = (taxParams.additionalInsuranceFee - report["totalAdditionalInsuranceFee" + propPostfix]).toFixed(2);
  return { updatedTaxParams: taxParams };
};
