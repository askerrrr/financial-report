var { reportsTreeCollection } = require("../connection");
var getReportsTree = require("./services/getReportsTree");
var updateReportsPeriods = require("./services/updateReportinPeriods");
var deleteReportsTreeByUserId = require("./services/deleteReportsTreeByUserId");
var deleteReportFromReportTree = require("./services/deleteReportFromReportTree");
var createReportsTreeEntity = require("./services/createReportsTreeEntity");

var reportsTreeCollectionServices = {
  createReportsTreeEntity: (userId) =>
    createReportsTreeEntity(reportsTreeCollection, userId),

  updateReportsPeriods: (userId, years) =>
    updateReportsPeriods(reportsTreeCollection, userId, years),

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
