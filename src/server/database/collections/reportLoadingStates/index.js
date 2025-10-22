var { reportLoadingStatesCollection } = require("../../connections");

var getLoadingProgressStatus = require("./services/getLoadingProgressStatus");
var createReportsLoadingStatesCollectionEntity = require("./services/createReportsLoadingStatesCollectionEntity");

var reportLoadingStatesCollectionServices = {
  getLoadingProgressStatus: (userId) => getLoadingProgressStatus(reportLoadingStatesCollection, userId),
  createReportsLoadingStatesCollectionEntity: (userId) => createReportsLoadingStatesCollectionEntity(reportLoadingStatesCollection, userId),
};

module.exports = reportLoadingStatesCollectionServices;
