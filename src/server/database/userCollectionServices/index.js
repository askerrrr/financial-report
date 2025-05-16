var { userCollection } = require("../connection/index");

var getUser = require("./services/getUser");
var createUser = require("./services/createUser");
var getUserById = require("./services/getUserByUserId");

var userCollectionServices = () => {
  return {
    createUser: (data, reportsEntityObjectId) =>
      createUser(userCollection, data, reportsEntityObjectId),

    getUser: (login) => getUser(userCollection, login),

    getUserById: (userId) => getUserById(userCollection, userId),
  };
};

module.exports = userCollectionServices;
