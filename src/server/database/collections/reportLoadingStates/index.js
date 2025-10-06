var { reportLoadingStatesCollection } = require("../../connections");
var createReportsLoadingStatesCollectionEntity = require("./services/createReportsLoadingStatesCollectionEntity");

var reportLoadingStatesCollectionServices = {
  createReportsLoadingStatesCollectionEntity: (userId) => createReportsLoadingStatesCollectionEntity(reportLoadingStatesCollection, userId),
};

module.exports = reportLoadingStatesCollectionServices;
