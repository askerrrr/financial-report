var { reportLoadingStatesCollection } = require("../../connections");

var prependToReportsQueue = require("./services/prependToReportsQueue");
var getLoadingProgressStatus = require("./services/getLoadingProgressStatus");
var deleteReportLoadingStates = require("./services/deleteReportLoadingStates");
var setLastReportRequestTimestamp = require('./services/setLastReportRequestTimestamp');
var createReportsLoadingStatesCollectionEntity = require("./services/createReportsLoadingStatesCollectionEntity");

var reportLoadingStatesCollectionServices = {
  getLoadingProgressStatus: (userId) => getLoadingProgressStatus(reportLoadingStatesCollection, userId),
  deleteReportLoadingStates: (userId, session) => deleteReportLoadingStates(reportLoadingStatesCollection, userId, session),
  prependToReportsQueue: (userId, dateFrom, dateTo) => prependToReportsQueue(reportLoadingStatesCollection, userId, dateFrom, dateTo),
  createReportsLoadingStatesCollectionEntity: (userId) => createReportsLoadingStatesCollectionEntity(reportLoadingStatesCollection, userId),
  setLastReportRequestTimestamp: (userId) => setLastReportRequestTimestamp(reportLoadingStatesCollection, userId);
};

module.exports = reportLoadingStatesCollectionServices;
