var { reportingPeriodsCollection } = require("../connection");
var getReportingPeriods = require("./services/getReportingPeriods");
var createReportingPeriodsEntity = require("./services/createReportingPeriodsCollectionEntity");

var reportingPeriodsCollectionServices = {
  createReportingPeriodsEntity: (userId) =>
    createReportingPeriodsEntity(reportingPeriodsCollection, userId),

  getReportingPeriods: (userId) =>
    getReportingPeriods(reportingPeriodsCollection, userId),
};

module.exports = reportingPeriodsCollectionServices;
