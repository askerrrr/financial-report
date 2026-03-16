var { reportsTreeCollection } = require("../../connections");

var getReportTree = require("./services/getReportTree");
var updateReportTree = require("./services/updateReportTree");
var deleteReportTreeByUserId = require("./services/deleteReportTreeByUserId");
var deleteReportFromReportTree = require("./services/deleteReportFromReportTree");

var reportsTreeCollectionServices = {
  updateReportTree: (userId, years) => updateReportTree(reportsTreeCollection, userId, years),

  getReportTree: (userId, session) => getReportTree(reportsTreeCollection, userId, session),

  deleteReportFromReportTree: (userId, year, month, reportId, session) =>
    deleteReportFromReportTree(reportsTreeCollection, userId, year, month, reportId, session),

  deleteReportTreeByUserId: (userId) => deleteReportTreeByUserId(reportsTreeCollection, userId),
};

module.exports = reportsTreeCollectionServices;
