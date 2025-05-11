var collection = require("./connection/index");

var createUser = require("./services/createUser");
var checkUserExists = require("./services/checkUserExists");

var userCollectionServices = () => {
  return {
    createUser: (data) => createUser(collection, data),
    checkUserExists: (login) => checkUserExists(collection, login),
  };
};

module.exports = userCollectionServices;
