var { reportCollection } = require("../connection/index");

var updateItems = require("./services/updateItems");
var createReport = require("./services/createReport");
var getReportById = require("./services/getReportById");
var createReportsEntity = require("./services/createReportsEntity");
var getReportsByUserId = require("./services/getReportsByUserId");

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
  };
};

module.exports = reportCollectionServices;
