var { reportLoadingStatesCollection } = require("../../connections");

var prependToReportsQueue = require("./services/prependToReportsQueue");
var getLoadingProgressStatus = require("./services/getLoadingProgressStatus");
var createReportsLoadingStatesCollectionEntity = require("./services/createReportsLoadingStatesCollectionEntity");

var reportLoadingStatesCollectionServices = {
  getLoadingProgressStatus: (userId) => getLoadingProgressStatus(reportLoadingStatesCollection, userId),
  prependToReportsQueue: (userId, dateFrom, dateTo) => prependToReportsQueue(reportLoadingStatesCollection, userId, dateFrom, dateTo),
  createReportsLoadingStatesCollectionEntity: (userId) => createReportsLoadingStatesCollectionEntity(reportLoadingStatesCollection, userId),
};

module.exports = reportLoadingStatesCollectionServices;
