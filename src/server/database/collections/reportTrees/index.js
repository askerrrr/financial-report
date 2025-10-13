var { reportsTreeCollection } = require("../../connections");

var getReportTree = require("./services/getReportTree");
var updateReportTree = require("./services/updateReportTree");
var createReportTreeEntity = require("./services/createReportTreeEntity");
var deleteReportsTreeByUserId = require("./services/deleteReportsTreeByUserId");
var deleteReportFromReportTree = require("./services/deleteReportFromReportTree");

var reportsTreeCollectionServices = {
  createReportTreeEntity: (userId) => createReportTreeEntity(reportsTreeCollection, userId),

  updateReportTree: (userId, years) => updateReportTree(reportsTreeCollection, userId, years),

  getReportTree: (userId) => getReportTree(reportsTreeCollection, userId),

  deleteReportFromReportTree: (userId, year, month, reportId) => deleteReportFromReportTree(reportsTreeCollection, userId, year, month, reportId),

  deleteReportsTreeByUserId: (userId) => deleteReportsTreeByUserId(reportsTreeCollection, userId),
};

module.exports = reportsTreeCollectionServices;
