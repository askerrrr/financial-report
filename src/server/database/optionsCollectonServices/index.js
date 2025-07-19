var { optionsCollection } = require("../connection/");
var changeTaxRateToDb = require("./services/changeTaxRateToDb");
var createOptionsEntity = require("./services/createOptionsEntity");

var optionsCollectonServices = {
  changeTaxRateToDb: (userId, taxRate) =>
    changeTaxRateToDb(optionsCollection, userId, taxRate),

  createOptionsEntity: (userId) =>
    createOptionsEntity(optionsCollection, userId),
};

module.exports = optionsCollectonServices;
