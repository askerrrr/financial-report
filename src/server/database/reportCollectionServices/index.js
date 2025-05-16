var { reportCollection } = require("../connection/index");

var createReport = require("./services/createReport");
var createReportsEntity = require("./services/createReportsEntity");
var getReportsByUserId = require("./services/getReportsByUserId");

var reportCollectionServices = () => {
  return {
    createReport: (userId, report) =>
      createReport(reportCollection, userId, report),

    createReportsEntity: (userId) =>
      createReportsEntity(reportCollection, userId),

    getReportsByUserId: (userId) =>
      getReportsByUserId(reportCollection, userId),
  };
};

module.exports = reportCollectionServices;
