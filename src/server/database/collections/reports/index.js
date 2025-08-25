var { reportCollection } = require("../../connections/");

var getReportById = require("./services/getReportById");
var saveReportToDb = require("./services/saveReportToDb");
var saveUpdatedReport = require("./services/saveUpdatedReport");
var saveUpdatedReports = require("./services/saveUpdatedReports");
var deleteReportFromDb = require("./services/deleteReportFromDb");
var createReportsEntity = require("./services/createReportsEntity");
var getReportsByUserId = require("./services/getReportsByUserId");
var updateReportPeriod = require("./services/updateReportPeriod");
var deleteAllReportsByUserId = require("./services/deleteAllReportsByUserId");

var reportCollectionServices = {
  saveReportToDb: (userId, report) => saveReportToDb(reportCollection, userId, report),

  getReportById: (userId, reportId) => getReportById(reportCollection, userId, reportId),

  createReportsEntity: (userId) => createReportsEntity(reportCollection, userId),

  getReportsByUserId: (userId, year) => getReportsByUserId(reportCollection, userId, year),

  saveUpdatedReport: (userId, reportId, report) => saveUpdatedReport(reportCollection, userId, reportId, report),

  saveUpdatedReports: (userId, reports) => saveUpdatedReports(reportCollection, userId, reports),

  updateReportPeriod: (userId, reportId, period) => updateReportPeriod(reportCollection, userId, reportId, period),

  deleteReportFromDb: (userId, reportId) => deleteReportFromDb(reportCollection, userId, reportId),

  deleteAllReportsByUserId: (userId) => deleteAllReportsByUserId(reportCollection, userId),
};
module.exports = reportCollectionServices;
