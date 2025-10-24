var { tokenCollection } = require("../../connections");
var saveWBTokenToDb = require("./services/saveWBTokenToDb");
var getWBTokenByUserId = require("./services/getWBTokenByUserId");
var createTokenCollectionEntity = require("./services/createTokenCollectionEntity");

var tokenCollectionServices = {
  saveWBTokenToDb: (userId, token) => saveWBTokenToDb(tokenCollection, userId, token),

  getWBTokenByUserId: (userId) => getWBTokenByUserId(tokenCollection, userId),

  createTokenCollectionEntity: (userId) => createTokenCollectionEntity(tokenCollection, userId),
};

module.exports = tokenCollectionServices;
