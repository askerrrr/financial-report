var { tokenCollection } = require("../../connections");
var saveWBTokenToDb = require("./services/saveWBTokenToDb");
var getWBTokenByUserId = require("./services/getWBTokenByUserId");
var createTokenCollectionEntity = require("./services/createTokenCollectionEntity");

var tokenCollectionServices = {
  getWBTokenByUserId: (userId, session) => getWBTokenByUserId(tokenCollection, userId, session),

  saveWBTokenToDb: (userId, token, session) => saveWBTokenToDb(tokenCollection, userId, token, session),

  createTokenCollectionEntity: (userId, session) => createTokenCollectionEntity(tokenCollection, userId, session),
};

module.exports = tokenCollectionServices;
