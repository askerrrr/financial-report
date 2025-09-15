var { skuCollection } = require("../../connections");
const createSKUsEntity = require("./services/createSKUsEntity");
var getSKUs = require("./services/getSKUs");

var skusCollectionServices = {
  getSKUs: (userId) => getSKUs(skuCollection, userId),

  createSKUsEntity: (userId) => createSKUsEntity(skuCollection, userId),
};

module.exports = skusCollectionServices;
