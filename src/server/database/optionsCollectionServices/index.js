var { optionsCollection } = require("../connection");
var getUserOptionsFromDb = require("./services/getUserOptionsFromDb");
var changeTaxRateToDb = require("./services/changeTaxRateToDb");
var createOptionsEntity = require("./services/createOptionsEntity");

var optionsCollectionServices = {
  getUserOptionsFromDb: (userId) =>
    getUserOptionsFromDb(optionsCollection, userId),

  changeTaxRateToDb: (userId, taxRate) =>
    changeTaxRateToDb(optionsCollection, userId, taxRate),

  createOptionsEntity: (userId) =>
    createOptionsEntity(optionsCollection, userId),
};

module.exports = optionsCollectionServices;
