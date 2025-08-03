var { taxParamsCollection } = require("../connection");
var addNewTaxYearToDb = require("./services/addNewTaxYear");
var getTaxParamsFromDb = require("./services/getTaxParamsFromDb");
var changeTaxRateToDb = require("./services/changeTaxRateToDb");
var createTaxParamsEntity = require("./services/createTaxParamsEntity");
var changePaidTaxAmountToDb = require("./services/changePaidTaxAmountToDb");
var changePaidInsuranceFeeToDb = require("./services/changeMandatoryInsuranceFeeToDb");
var changeInsuranceFeePercentageToDb = require("./services/changeInsuranceFeePercentageToDb");
var changeMandatoryInsuranceFeeToDb = require("./services/changeMandatoryInsuranceFeeToDb");

var taxParamsCollectionServices = {
  addNewTaxYearToDb: (userId, year) =>
    addNewTaxYearToDb(taxParamsCollection, userId, year),

  getTaxParamsFromDb: (userId) =>
    getTaxParamsFromDb(taxParamsCollection, userId),

  changeTaxRateToDb: (userId, taxRate) =>
    changeTaxRateToDb(taxParamsCollection, userId, taxRate),

  createTaxParamsEntity: (userId) =>
    createTaxParamsEntity(taxParamsCollection, userId),

  changePaidTaxAmountToDb: (userId, paidTaxAmount) =>
    changePaidTaxAmountToDb(taxParamsCollection, userId, paidTaxAmount),

  changeInsuranceFeePercentageToDb: (userId, insuranceFeePercentage) =>
    changeInsuranceFeePercentageToDb(
      taxParamsCollection,
      userId,
      insuranceFeePercentage
    ),

  changePaidInsuranceFeeToDb: (userId, paidInsuranceFee) =>
    changePaidInsuranceFeeToDb(taxParamsCollection, userId, paidInsuranceFee),

  changeMandatoryInsuranceFeeToDb: (userId, mandatoryInsuranceFee) =>
    changeMandatoryInsuranceFeeToDb(
      taxParamsCollection,
      userId,
      mandatoryInsuranceFee
    ),
};

module.exports = taxParamsCollectionServices;
