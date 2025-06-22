var { reportingPeriodsCollection } = require("../connection");
var createReportingPeriodsEntity = require("./services/createReportingPeriodsCollectionEntity");

var reportingPeriodsCollectionServices = {
  createReportingPeriodsEntity: (userId) =>
    createReportingPeriodsEntity(reportingPeriodsCollection, userId),
};

module.exports = reportingPeriodsCollectionServices;
