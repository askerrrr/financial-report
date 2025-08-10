var { reportsTreeCollection } = require("../connection");
var getReportsTree = require("./services/getReportsTree");
var updateReportTree = require("./services/updateReportTree");
var deleteReportsTreeByUserId = require("./services/deleteReportsTreeByUserId");
var deleteReportFromReportTree = require("./services/deleteReportFromReportTree");
var createReportsTreeEntity = require("./services/createReportsTreeEntity");

var reportsTreeCollectionServices = {
  createReportsTreeEntity: (userId) =>
    createReportsTreeEntity(reportsTreeCollection, userId),

  updateReportTree: (userId, years) =>
    updateReportTree(reportsTreeCollection, userId, years),

  getReportsTree: (userId) => getReportsTree(reportsTreeCollection, userId),

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
