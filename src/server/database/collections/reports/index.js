var { reportCollection } = require("../../connections/");

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

var reportCollectionServices = {
  getReportById: (userId, reportId) => getReportById(reportCollection, userId, reportId),
  getReportsByUserId: (userId, year) => getReportsByUserId(reportCollection, userId, year),

  createReportsEntity: (userId) => createReportsEntity(reportCollection, userId),

  saveReportToDb: (userId, report) => saveReportToDb(reportCollection, userId, report),

  saveUpdatedReports: (userId, reports) => saveUpdatedReports(reportCollection, userId, reports),

  saveUpdatedReport: (userId, reportId, report) => saveUpdatedReport(reportCollection, userId, reportId, report),

  updateReportPeriod: (userId, reportId, period) => updateReportPeriod(reportCollection, userId, reportId, period),

  checkReportExistsToDb: (userId, dateFrom, dateTo) => checkReportExistsToDb(reportCollection, userId, dateFrom, dateTo),

  deleteReportFromDb: (userId, reportId) => deleteReportFromDb(reportCollection, userId, reportId),

  deleteAllReportsByUserId: (userId) => deleteAllReportsByUserId(reportCollection, userId),
};

module.exports = reportCollectionServices;
