var { reportCollection } = require("../../connections");

var getReportById = require("./services/getReportById");
var saveReportToDb = require("./services/saveReportToDb");
var saveUpdatedReport = require("./services/saveUpdatedReport");
var checkReportExistsToDb = require("./services/checkReportExistsToDb");
var saveUpdatedReports = require("./services/saveUpdatedReports");
var deleteReportFromDb = require("./services/deleteReportFromDb");
var getReportsByUserId = require("./services/getReportsByUserId");
var updateReportPeriod = require("./services/updateReportPeriod");
var createReportsEntity = require("./services/createReportsEntity");
var deleteAllReportsByUserId = require("./services/deleteAllReportsByUserId");
var getAllDataFromReportCollection = require("./services/getAllDataFromReportCollection");

var reportCollectionServices = {
  getAllDataFromReportCollection: () => getAllDataFromReportCollection(reportCollection),
  getReportById: (userId, reportId) => getReportById(reportCollection, userId, reportId),
  getReportsByUserId: (userId, projectQuery, reportIds) =>
    getReportsByUserId(reportCollection, userId, projectQuery, reportIds),

  createReportsEntity: (userId) => createReportsEntity(reportCollection, userId),

  saveReportToDb: (userId, report, session) =>
    saveReportToDb(reportCollection, userId, report, session),
  saveUpdatedReports: (userId, reports) => saveUpdatedReports(reportCollection, userId, reports),


  saveUpdatedReport: (userId, reportId, report, session) =>
    saveUpdatedReport(reportCollection, userId, reportId, report, session),

  updateReportPeriod: (userId, reportId, period) =>
    updateReportPeriod(reportCollection, userId, reportId, period),

  checkReportExistsToDb: (userId, dateFrom, dateTo) =>
    checkReportExistsToDb(reportCollection, userId, dateFrom, dateTo),

  deleteReportFromDb: (userId, reportId, session) =>
    deleteReportFromDb(reportCollection, userId, reportId, session),
  deleteAllReportsByUserId: (userId) => deleteAllReportsByUserId(reportCollection, userId),
};

module.exports = reportCollectionServices;
