var { userCollection } = require("../../connections");

var getUserById = require("./services/getUserByUserId");
var getUserByLogin = require("./services/getUserByLogin");
var getAllUsersFromDb = require("./services/getAllUsers");
var createUserToDb = require("./services/createUserToDb");
var deleteUserFromDb = require("./services/deleteUserFromDb");
var deleteUsersFromDb = require("./services/deleteUsersFromDb");

var userCollectionServices = {
  createUserToDb: (user, session) => createUserToDb(user, session),

  getUserByLogin: (login, session) => getUserByLogin(userCollection, login, session),

  getUserById: (userId) => getUserById(userCollection, userId),

  getAllUsersFromDb: () => getAllUsersFromDb(userCollection),

  deleteUserFromDb: (userId, session) => deleteUserFromDb(userId, session),
  deleteUsersFromDb: (session) => deleteUsersFromDb(session),
};

module.exports = userCollectionServices;
