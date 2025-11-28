var { tokenCollection } = require("../../connections");
var saveWBTokenToDb = require("./services/saveWBTokenToDb");
var getWBTokenByUserId = require("./services/getWBTokenByUserId");
var createTokenCollectionEntity = require("./services/createTokenCollectionEntity");

var tokenCollectionServices = {
  getWBTokenByUserId: (userId) => getWBTokenByUserId(tokenCollection, userId),

  saveWBTokenToDb: (userId, token, session) => saveWBTokenToDb(tokenCollection, userId, token, session),

  createTokenCollectionEntity: (userId) => createTokenCollectionEntity(tokenCollection, userId),
};

module.exports = tokenCollectionServices;
