var { reportingPeriodsCollection } = require("../connection");
var getReportingPeriods = require("./services/getReportingPeriods");
var updateReportsPeriods = require("./services/updateReportinPeriods");
var createReportingPeriodsEntity = require("./services/createReportingPeriodsCollectionEntity");

var reportingPeriodsCollectionServices = {
  createReportingPeriodsEntity: (userId) =>
    createReportingPeriodsEntity(reportingPeriodsCollection, userId),

  updateReportsPeriods: (userId, years) =>
    updateReportsPeriods(reportingPeriodsCollection, userId, years),

  getReportingPeriods: (userId) =>
    getReportingPeriods(reportingPeriodsCollection, userId),
};

module.exports = reportingPeriodsCollectionServices;
