var { optionsCollection } = require("../connection/");
var getUserOptions = require("./services/getUserOptions");
var changeTaxRateToDb = require("./services/changeTaxRateToDb");
var createOptionsEntity = require("./services/createOptionsEntity");

var optionsCollectonServices = {
  getUserOptions: (userId) => getUserOptions(optionsCollection, userId),

  changeTaxRateToDb: (userId, taxRate) =>
    changeTaxRateToDb(optionsCollection, userId, taxRate),

  createOptionsEntity: (userId) =>
    createOptionsEntity(optionsCollection, userId),
};

module.exports = optionsCollectonServices;
