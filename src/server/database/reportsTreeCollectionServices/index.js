var { reportsTreeCollection } = require("../connection");
var getReportingPeriods = require("./services/getReportingPeriods");
var updateReportsPeriods = require("./services/updateReportinPeriods");
var createReportingPeriodsEntity = require("./services/createReportingPeriodsCollectionEntity");
var deleteReportsTreeByUserId = require("./services/deleteReportsTreeByUserId");
var deleteReportFromReportTree = require("./services/deleteReportFromReportTree");

var reportsTreeCollectionServices = {
  createReportingPeriodsEntity: (userId) =>
    createReportingPeriodsEntity(reportsTreeCollection, userId),

  updateReportsPeriods: (userId, years) =>
    updateReportsPeriods(reportsTreeCollection, userId, years),

  getReportingPeriods: (userId) =>
    getReportingPeriods(reportsTreeCollection, userId),

  deleteReportFromReportTree: (userId, year, month, reportId) =>
    deleteReportFromReportTree(
      reportsTreeCollection,
      userId,
      year,
      month,
      reportId
    ),

  deleteReportsTreeByUserId: (userId) =>
    deleteReportsTreeByUserId(reportsTreeCollection, userId),
};

module.exports = reportsTreeCollectionServices;
