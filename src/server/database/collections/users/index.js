var { userCollection } = require("../../connections");

var getUserByLogin = require("./services/getUserByLogin");
var createUserToDb = require("./services/createUserToDb");
var getUserById = require("./services/getUserByUserId");

var userCollectionServices = {
  createUserToDb: (user) => createUserToDb(userCollection, user),

  getUserByLogin: (login) => getUserByLogin(userCollection, login),

  getUserById: (userId) => getUserById(userCollection, userId),
};

module.exports = userCollectionServices;
