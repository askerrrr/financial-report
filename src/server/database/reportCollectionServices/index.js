var { reportCollection } = require("../connection/index");

var updateItems = require("./services/updateItems");

var saveUpdatedReport = require("./services/saveUpdatedReport");
var saveReportToDb = require("./services/saveReportToDb");
var getReportById = require("./services/getReportById");
var deleteReportFromDb = require("./services/deleteReportFromDb");
var createReportsEntity = require("./services/createReportsEntity");
var getReportsByUserId = require("./services/getReportsByUserId");
var updateReportPeriod = require("./services/updateReportPeriod");
var deleteAllReportsByUserId = require("./services/deleteAllReportsByUserId");

var reportCollectionServices = {
  saveReportToDb: (userId, report) =>
    saveReportToDb(reportCollection, userId, report),

  getReportById: (userId, reportId) =>
    getReportById(reportCollection, userId, reportId),

  createReportsEntity: (userId) =>
    createReportsEntity(reportCollection, userId),

  getReportsByUserId: (userId) => getReportsByUserId(reportCollection, userId),

  saveUpdatedReport: (userId, reportId, report) =>
    saveUpdatedReport(reportCollection, userId, reportId, report),

  updateItems: (userId, reportId, items) =>
    updateItems(reportCollection, userId, reportId, items),

  updateReportPeriod: (userId, reportId, period) =>
    updateReportPeriod(reportCollection, userId, reportId, period),

  deleteReportFromDb: (userId, reportId) =>
    deleteReportFromDb(reportCollection, userId, reportId),

  deleteAllReportsByUserId: (userId) =>
    deleteAllReportsByUserId(reportCollection, userId),
};
module.exports = reportCollectionServices;
