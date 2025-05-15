var { userCollection } = require("../connection/index");

var getUser = require("./services/getUser");
var createUser = require("./services/createUser");
var getUserById = require("./services/getUserByUserId");
var getReportsByUserId = require("./services/getReportsByUserId");

var userCollectionServices = () => {
  return {
    createUser: (data, reportsEntityObjectId) =>
      createUser(userCollection, data, reportsEntityObjectId),

    getUser: (login) => getUser(userCollection, login),

    getUserById: (userId) => getUserById(userCollection, userId),

    getReportsByUserId: (userId) => getReportsByUserId(userCollection, userId),
  };
};

module.exports = userCollectionServices;
