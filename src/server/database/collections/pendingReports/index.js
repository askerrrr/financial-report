var { pendingReportsCollection } = require("../../connections");
var createPendingReportsEntity = require("./services/createPendingReportsEntity");

var pendingReportsCollectionServices = {
  createPendingReportsEntity: (userId) => createPendingReportsEntity(pendingReportsCollection, userId),
};

module.exports = pendingReportsCollectionServices;
