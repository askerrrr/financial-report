var { tokenCollection } = require("../connection/index");
var createTokenCollectionEntity = require("./services/createTokenCollectionEntity");

var tokenCollectionServices = () => {
  return {
    createTokenCollectionEntity: (userId) =>
      createTokenCollectionEntity(tokenCollection, userId),
  };
};

module.exports = tokenCollectionServices;
