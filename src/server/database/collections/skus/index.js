var { skuCollection } = require("../../connections");
var getSKUs = require("./services/getSKUs");

var skusCollectionServices = {
  getSKUs: (userId) => getSKUs(skuCollection, userId),
};

module.exports = skusCollectionServices;
