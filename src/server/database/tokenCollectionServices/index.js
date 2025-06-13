var { tokenCollection } = require("../connection/index");
var updateWBToken = require("./services/updateWBToken");
var getWBTokenByUserId = require("./services/getWBTokenByUserId");
var createTokenCollectionEntity = require("./services/createTokenCollectionEntity");

var tokenCollectionServices = () => {
  return {
    updateWBToken: (userId, token) =>
      updateWBToken(tokenCollection, userId, token),

    getWBTokenByUserId: (userId) => getWBTokenByUserId(tokenCollection, userId),

    createTokenCollectionEntity: (userId) =>
      createTokenCollectionEntity(tokenCollection, userId),
  };
};

module.exports = tokenCollectionServices;
