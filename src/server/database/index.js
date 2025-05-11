var collection = require("./connection/index");

var createUser = require("./services/createUser");

var userCollectionServices = (collection) => {
  return {
    createUser: (data) => createUser(collection, data),
  };
};

module.exports = userCollectionServices;
