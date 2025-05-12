var collection = require("./connection/index");

var getUser = require("./services/getUser");
var createUser = require("./services/createUser");
var createReport = require("./services/createReport");

var userCollectionServices = () => {
  return {
    createUser: (data) => createUser(collection, data),
    getUser: (login) => getUser(collection, login),
    createReport: (userId, report) => createReport(collection, userId, report),
  };
};

module.exports = userCollectionServices;
