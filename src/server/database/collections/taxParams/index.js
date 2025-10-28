var { taxParamsCollection } = require("../../connections");
var deleteTaxYears = require("./services/deleteTaxYears");
var addNewTaxYearToDb = require("./services/addNewTaxYear");
var getTaxParamsFromDb = require("./services/getTaxParamsFromDb");
var changeTaxParamsToDb = require("./services/changeTaxParamsToDb");
var saveUpdatedTaxParams = require("./services/saveUpdatedTaxParams");
var createTaxParamsEntity = require("./services/createTaxParamsEntity");
var changePaidTaxAmountToDb = require("./services/changePaidTaxAmountToDb");
var changePaidInsuranceFeeToDb = require("./services/changePaidInsuranceFee");

var taxParamsCollectionServices = {
  deleteTaxYears: (userId) => deleteTaxYears(taxParamsCollection, userId),

  addNewTaxYearToDb: (userId, year) => addNewTaxYearToDb(taxParamsCollection, userId, year),

  getTaxParamsFromDb: (userId, year) => getTaxParamsFromDb(taxParamsCollection, userId, year),

  createTaxParamsEntity: (userId, year) => createTaxParamsEntity(taxParamsCollection, userId, year),

  changeTaxParamsToDb: (userId, year, newTaxParam) =>
    changeTaxParamsToDb(taxParamsCollection, userId, year, newTaxParam),

  changePaidTaxAmountToDb: (userId, year, paidTaxAmount) =>
    changePaidTaxAmountToDb(taxParamsCollection, userId, year, paidTaxAmount),

  changePaidInsuranceFeeToDb: (userId, year, paidInsuranceFee) =>
    changePaidInsuranceFeeToDb(taxParamsCollection, userId, year, paidInsuranceFee),

  saveUpdatedTaxParams: (userId, year, taxParams) =>
    saveUpdatedTaxParams(taxParamsCollection, userId, year, taxParams),
};

module.exports = taxParamsCollectionServices;
