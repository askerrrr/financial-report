var { reportingPeriodsCollection } = require("../connection");
var {
  createReportingPeriodsCollectionEntity,
} = require("./services/createReportingPeriodsCollectionEntity");

var reportingPeriodsCollectionServices = {
  createReportingPeriodsCollectionEntity: (userId) =>
    createReportingPeriodsCollectionEntity(reportingPeriodsCollection, userId),
};

module.exports = reportingPeriodsCollectionServices;
