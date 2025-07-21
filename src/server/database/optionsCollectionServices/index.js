var { optionsCollection } = require("../connection");
var getUserOptionsFromDb = require("./services/getUserOptionsFromDb");
var changeTaxRateToDb = require("./services/changeTaxRateToDb");
var createOptionsEntity = require("./services/createOptionsEntity");
var changeInsuranceFeePercentageToDb = require("./services/changeInsuranceFeePercentageToDb");
var changeMandatoryInsurancePremiumsToDb = require("./services/changeMandatoryInsurancePremiumsToDb");

var optionsCollectionServices = {
  getUserOptionsFromDb: (userId) =>
    getUserOptionsFromDb(optionsCollection, userId),

  changeTaxRateToDb: (userId, taxRate) =>
    changeTaxRateToDb(optionsCollection, userId, taxRate),

  createOptionsEntity: (userId) =>
    createOptionsEntity(optionsCollection, userId),

  changeInsuranceFeePercentageToDb: (userId, insuranceFeePercentage) =>
    changeInsuranceFeePercentageToDb(
      optionsCollection,
      userId,
      insuranceFeePercentage
    ),

  changeMandatoryInsurancePremiumsToDb: (userId, mandatoryInsurancePremiums) =>
    changeMandatoryInsurancePremiumsToDb(
      optionsCollection,
      userId,
      mandatoryInsurancePremiums
    ),
};

module.exports = optionsCollectionServices;
