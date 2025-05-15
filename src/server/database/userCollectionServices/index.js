var { userCollection } = require("../connection/index");

var getUser = require("./services/getUser");
var createUser = require("./services/createUser");
var getReportsByUserId = require("./services/getReportsByUserId");

var userCollectionServices = () => {
  return {
    createUser: (data, reportsEntityObjectId) =>
      createUser(userCollection, data, reportsEntityObjectId),
    getUser: (login) => getUser(userCollection, login),
    getReportsByUserId: (userId) => getReportsByUserId(userCollection, userId),
  };
};

module.exports = userCollectionServices;
