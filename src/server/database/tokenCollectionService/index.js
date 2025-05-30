var { tokenCollection } = require("../connection/index");
var updateWBToken = require("./services/updateWBToken");
var createTokenCollectionEntity = require("./services/createTokenCollectionEntity");

var tokenCollectionServices = () => {
  return {
    updateWBToken: (userId, token) =>
      updateWBToken(tokenCollection, userId, token),

    createTokenCollectionEntity: (userId) =>
      createTokenCollectionEntity(tokenCollection, userId),
  };
};

module.exports = tokenCollectionServices;
