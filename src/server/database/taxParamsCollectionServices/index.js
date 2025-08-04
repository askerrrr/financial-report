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

  getTaxParamsFromDb: (userId, year) =>
    getTaxParamsFromDb(taxParamsCollection, userId, year),

  changeTaxRateToDb: (userId, year, taxRate) =>
    changeTaxRateToDb(taxParamsCollection, userId, year, taxRate),

  createTaxParamsEntity: (userId, year) =>
    createTaxParamsEntity(taxParamsCollection, userId, year),

  changePaidTaxAmountToDb: (userId, year, paidTaxAmount) =>
    changePaidTaxAmountToDb(taxParamsCollection, userId, year, paidTaxAmount),

  changeInsuranceFeePercentageToDb: (userId, year, insuranceFeePercentage) =>
    changeInsuranceFeePercentageToDb(
      taxParamsCollection,
      userId,
      year,
      insuranceFeePercentage
    ),

  changePaidInsuranceFeeToDb: (userId, year, paidInsuranceFee) =>
    changePaidInsuranceFeeToDb(
      taxParamsCollection,
      userId,
      year,
      paidInsuranceFee
    ),

  changeMandatoryInsuranceFeeToDb: (userId, year, mandatoryInsuranceFee) =>
    changeMandatoryInsuranceFeeToDb(
      taxParamsCollection,
      userId,
      year,
      mandatoryInsuranceFee
    ),
};

module.exports = taxParamsCollectionServices;
