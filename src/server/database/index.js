var collection = require("./connection/index");

var createUser = require("./services/createUser");

var userCollectionServices = () => {
  return {
    createUser: (data) => createUser(collection, data),
  };
};

module.exports = userCollectionServices;
