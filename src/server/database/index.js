var { userCollection, reportCollection } = require("./connection/index");

var getUser = require("./services/getUser");
var createUser = require("./services/createUser");
var createReport = require("./services/createReport");

var userCollectionServices = () => {
  return {
    createUser: (data) => createUser(userCollection, data),
    getUser: (login) => getUser(userCollection, login),
    createReport: (userId, report) =>
      createReport(reportCollection, userId, report),
  };
};

module.exports = userCollectionServices;
