var { tokenCollection } = require("../../connections");
var saveWBTokenToDb = require("./services/saveWBTokenToDb");
var getWBTokenByUserId = require("./services/getWBTokenByUserId");

var tokenCollectionServices = {
  getWBTokenByUserId: (userId, session) => getWBTokenByUserId(tokenCollection, userId, session),

  saveWBTokenToDb: (userId, token, session) => saveWBTokenToDb(tokenCollection, userId, token, session),
};

module.exports = tokenCollectionServices;
