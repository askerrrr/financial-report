var { reportsTreeCollection } = require("../connection");
var getReportingPeriods = require("./services/getReportingPeriods");
var updateReportsPeriods = require("./services/updateReportinPeriods");
var deleteReportsTreeByUserId = require("./services/deleteReportsTreeByUserId");
var deleteReportFromReportTree = require("./services/deleteReportFromReportTree");
var createReportsTreeEntity = require("./services/createReportsTreeEntity");

var reportsTreeCollectionServices = {
  createReportsTreeEntity: (userId) =>
    createReportsTreeEntity(reportsTreeCollection, userId),

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
