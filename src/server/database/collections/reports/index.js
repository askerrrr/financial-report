var { reportCollection } = require("../../connections");

var getReportById = require("./services/getReportById");
var saveReportToDb = require("./services/saveReportToDb");
var saveUpdatedReport = require("./services/saveUpdatedReport");
var checkReportExistsToDb = require("./services/checkReportExistsToDb");
var saveUpdatedReports = require("./services/saveUpdatedReports");
var deleteReportFromDb = require("./services/deleteReportFromDb");
var getReportsByUserId = require("./services/getReportsByUserId");
var updateReportPeriod = require("./services/updateReportPeriod");
var deleteAllReportsByUserId = require("./services/deleteAllReportsByUserId");
var getAllDataFromReportCollection = require("./services/getAllDataFromReportCollection");
var updateReportFinancialAccountingStatus = require("./services/updateReportFinancialAccountingStatus");

var reportCollectionServices = {
  getAllDataFromReportCollection: () => getAllDataFromReportCollection(reportCollection),
  getReportById: (userId, reportId, session) => getReportById(reportCollection, userId, reportId, session),
  getReportsByUserId: (userId, session, projectQuery, reportIds) => getReportsByUserId(reportCollection, userId, session, projectQuery, reportIds),

  saveReportToDb: (userId, report, session) => saveReportToDb(reportCollection, userId, report, session),
  saveUpdatedReports: (userId, reports) => saveUpdatedReports(reportCollection, userId, reports),

  saveUpdatedReport: (userId, reportId, report, session) => saveUpdatedReport(reportCollection, userId, reportId, report, session),

  updateReportPeriod: (userId, reportId, period) => updateReportPeriod(reportCollection, userId, reportId, period),
  updateReportFinancialAccountingStatus: (userId, reportId, newStatus) =>
    updateReportFinancialAccountingStatus(reportCollection, userId, reportId, newStatus),

  checkReportExistsToDb: (userId, dateFrom, dateTo) => checkReportExistsToDb(reportCollection, userId, dateFrom, dateTo),

  deleteReportFromDb: (userId, reportId, session) => deleteReportFromDb(reportCollection, userId, reportId, session),
  deleteAllReportsByUserId: (userId) => deleteAllReportsByUserId(reportCollection, userId),
};

module.exports = reportCollectionServices;
