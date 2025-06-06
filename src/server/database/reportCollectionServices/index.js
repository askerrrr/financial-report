var { reportCollection } = require("../connection/index");

var updateItems = require("./services/updateItems");
var deleteReport = require("./services/deleteReport");
var updateReport = require("./services/updateReport");
var createReport = require("./services/createReport");
var getReportById = require("./services/getReportById");
var createReportsEntity = require("./services/createReportsEntity");
var getReportsByUserId = require("./services/getReportsByUserId");
var updateReportPeriod = require("./services/updateReportPeriod");

var reportCollectionServices = () => {
  return {
    createReport: (userId, report) =>
      createReport(reportCollection, userId, report),

    getReportById: (userId, reportId) =>
      getReportById(reportCollection, userId, reportId),

    createReportsEntity: (userId) =>
      createReportsEntity(reportCollection, userId),

    getReportsByUserId: (userId) =>
      getReportsByUserId(reportCollection, userId),

    updateReport: (userId, reportId, report) =>
      updateReport(reportCollection, userId, reportId, report),

    updateItems: (userId, reportId, items) =>
      updateItems(reportCollection, userId, reportId, items),

    updateReportPeriod: (userId, reportId, period) =>
      updateReportPeriod(reportCollection, userId, reportId, period),

    deleteReport: (userId, reportId) =>
      deleteReport(reportCollection, userId, reportId),
  };
};

module.exports = reportCollectionServices;
