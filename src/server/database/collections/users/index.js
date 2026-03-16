var { userCollection } = require("../../connections");

var getUserByLogin = require("./services/getUserByLogin");
var getAllUsersFromDb = require("./services/getAllUsers");
var createUserToDb = require("./services/createUserToDb");
var getUserById = require("./services/getUserByUserId");

var userCollectionServices = {
  createUserToDb: (user, session) => createUserToDb(userCollection, user, session),

  getUserByLogin: (login, session) => getUserByLogin(userCollection, login, session),

  getUserById: (userId) => getUserById(userCollection, userId),

  getAllUsersFromDb: () => getAllUsersFromDb(userCollection),
};

module.exports = userCollectionServices;
