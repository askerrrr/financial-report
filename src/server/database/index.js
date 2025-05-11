var collection = require("./connection/index");

var createUser = require("./services/createUser");
var getUser = require("./services/getUser");

var userCollectionServices = () => {
  return {
    createUser: (data) => createUser(collection, data),
    getUser: (login) => getUser(collection, login),
  };
};

module.exports = userCollectionServices;
