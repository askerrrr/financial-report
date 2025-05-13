var { userCollection, reportCollection } = require("../connection/index");

var getUser = require("./services/getUser");
var createUser = require("./services/createUser");
var createReport = require("./services/createReport");
var createReportsEntity = require("./services/createReportsEntity");

var userCollectionServices = () => {
  return {
    createUser: (data) => createUser(userCollection, data),
    getUser: (login) => getUser(userCollection, login),
    createReport: (userId, report) =>
      createReport(reportCollection, userId, report),
    createReportsEntity: (userId) =>
      createReportsEntity(reportCollection, userId),
  };
};

module.exports = userCollectionServices;
