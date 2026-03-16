var { reportLoadingStatesCollection } = require("../../connections");

var getReportLoadingState = require("./services/getReportLoadingState");
var prependToReportsQueue = require("./services/prependToReportsQueue");
var getLoadingProgressStatus = require("./services/getLoadingProgressStatus");
var deleteReportLoadingStates = require("./services/deleteReportLoadingStates");
var setLastReportRequestTimestamp = require("./services/setLastReportRequestTimestamp");

var reportLoadingStatesCollectionServices = {
  getReportLoadingState: (userId, session) => getReportLoadingState(reportLoadingStatesCollection, userId, session),
  getLoadingProgressStatus: (userId) => getLoadingProgressStatus(reportLoadingStatesCollection, userId),
  deleteReportLoadingStates: (userId, session) => deleteReportLoadingStates(reportLoadingStatesCollection, userId, session),
  prependToReportsQueue: (userId, dateFrom, dateTo) => prependToReportsQueue(reportLoadingStatesCollection, userId, dateFrom, dateTo),
  setLastReportRequestTimestamp: (userId, session) => setLastReportRequestTimestamp(reportLoadingStatesCollection, userId, session),
};

module.exports = reportLoadingStatesCollectionServices;
