var { tokenCollection } = require("../../connections");
var updateWBToken = require("./services/updateWBToken");
var getWBTokenByUserId = require("./services/getWBTokenByUserId");
var createTokenCollectionEntity = require("./services/createTokenCollectionEntity");

var tokenCollectionServices = {
  updateWBToken: (userId, token) => updateWBToken(tokenCollection, userId, token),

  getWBTokenByUserId: (userId) => getWBTokenByUserId(tokenCollection, userId),

  createTokenCollectionEntity: (userId) => createTokenCollectionEntity(tokenCollection, userId),
};

module.exports = tokenCollectionServices;
