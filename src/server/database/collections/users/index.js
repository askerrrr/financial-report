var { userCollection } = require("../connection/index");

var getUserByLogin = require("./services/getUserByLogin");
var createUser = require("./services/createUser");
var getUserById = require("./services/getUserByUserId");

var userCollectionServices = {
  createUser: (data, reportsEntityObjectId) =>
    createUser(userCollection, data, reportsEntityObjectId),

  getUserByLogin: (login) => getUserByLogin(userCollection, login),

  getUserById: (userId) => getUserById(userCollection, userId),
};

module.exports = userCollectionServices;
