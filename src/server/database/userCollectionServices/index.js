var { userCollection } = require("../connection/index");

var getUser = require("./services/getUser");
var createUser = require("./services/createUser");
var getReportsByUserId = require("./services/getReportsByUserId");

var userCollectionServices = () => {
  return {
    createUser: (data) => createUser(userCollection, data),
    getUser: (login) => getUser(userCollection, login),
  };
};

module.exports = userCollectionServices;
