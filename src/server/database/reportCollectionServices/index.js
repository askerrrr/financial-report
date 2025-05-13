var { reportCollection } = require("../connection/index");

var createReport = require("./services/createReport");
var createReportsEntity = require("./services/createReportsEntity");

var reportCollectionServices = async () => {
  return {
    createReport: (userId, report) =>
      createReport(reportCollection, userId, report),

    createReportsEntity: (userId) =>
      createReportsEntity(reportCollection, userId),
  };
};

module.exports = reportCollectionServices;
