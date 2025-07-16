var { reportsTreeCollection } = require("../connection");
var getReportingPeriods = require("./services/getReportingPeriods");
var updateReportsPeriods = require("./services/updateReportinPeriods");
var createReportingPeriodsEntity = require("./services/createReportingPeriodsCollectionEntity");
var deleteAllReportingPeriodsByUserId = require("./services/deleteAllReportingPeriodsByUserId");

var reportsTreeCollectionServices = {
  createReportingPeriodsEntity: (userId) =>
    createReportingPeriodsEntity(reportsTreeCollection, userId),

  updateReportsPeriods: (userId, years) =>
    updateReportsPeriods(reportsTreeCollection, userId, years),

  getReportingPeriods: (userId) =>
    getReportingPeriods(reportsTreeCollection, userId),

  deleteAllReportingPeriodsByUserId: (userId) =>
    deleteAllReportingPeriodsByUserId(reportsTreeCollection, userId),
};

module.exports = reportsTreeCollectionServices;
