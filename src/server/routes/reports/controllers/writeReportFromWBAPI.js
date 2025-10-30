var { connection } = require("../../../database/");
var sortYearsTree = require("../services/different/sortYearTree");
var insertReportToReportTree = require("../services/reportTreeBuilder");
var parseReports = require("../services/writeAndCalcReportDataFromWBAPI/index");
var { reportSchemaVersion, recordToSchemaVersion } = require("../../../database/migration/schemaVersioning/reportsCollection");

var writeReportFromWBAPI = async (req, res, next) => {
  try {
    var { saveReportToDb } = req.app.locals.reportCollectionServices;
    var { getReportTree, updateReportTree } = req.app.locals.reportsTreeCollectionServices;
    var { addNewTaxYearToDb, changeTaxParamsToDb } = req.app.locals.taxParamsCollectionServices;

    var { dateTo, dateFrom, reports, userId } = req.body;

    var reportId = reports.mainReport[0].realizationreport_id;

    var { reportTree } = await getReportTree(userId);
    var session = await connection.startSession();

    try {
      session.startTransaction();

      var { years, year, month } = await insertReportToReportTree(dateFrom, dateTo, reportId, reportTree);
      var sortedYears = sortYearsTree(years);

      var { taxRate, paidTaxAmount } = await addNewTaxYearToDb(userId, year, session);
      var { report, skuNamesAndIds } = await parseReports(taxRate, reports);
      paidTaxAmount += report.totalTaxAmount;

      report.dateTo = dateTo;
      report.userId = userId;
      report.dateFrom = dateFrom;
      report.reportId = reportId;
      report.schemaVersion = reportSchemaVersion;
      report.recordTo = { year, month, schemaVersion: recordToSchemaVersion };

      await saveReportToDb(userId, report, session);
      await updateReportTree(userId, sortedYears, session);
      await changeTaxParamsToDb(userId, year, session, { paidTaxAmount });

      session.commitTransaction();

      res.status(200).json({ reportId, year, month, dateFrom, dateTo, totalTaxAmount: report.totalTaxAmount });
    } catch (e) {
      await session.abortTransaction();
      return res.status(400).json({ msg: "Произошла ошибка, попробуйте повторить еще раз через 1 минуту" });
    } finally {
      await session.endSession();
    }
  } catch (e) {
    console.log({ e });
  }
};

module.exports = writeReportFromWBAPI;
