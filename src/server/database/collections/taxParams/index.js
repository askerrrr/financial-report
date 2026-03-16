var { taxParamsCollection } = require("../../connections");
var deleteTaxYears = require("./services/deleteTaxYears");
var addNewTaxYearToDb = require("./services/addNewTaxYear");
var getTaxParamsFromDb = require("./services/getTaxParamsFromDb");
var changeTaxParamsToDb = require("./services/changeTaxParamsToDb");
var saveUpdatedTaxParams = require("./services/saveUpdatedTaxParams");
var createTaxParamsEntity = require("./services/createTaxParamsEntity");

var taxParamsCollectionServices = {
  deleteTaxYears: (userId) => deleteTaxYears(taxParamsCollection, userId),

  addNewTaxYearToDb: (userId, year, session) => addNewTaxYearToDb(taxParamsCollection, userId, year, session),

  getTaxParamsFromDb: (userId, year, session) => getTaxParamsFromDb(taxParamsCollection, userId, year, session),

  createTaxParamsEntity: (userId, session) => createTaxParamsEntity(taxParamsCollection, userId, session),

  changeTaxParamsToDb: (userId, year, session, newTaxParam) => changeTaxParamsToDb(taxParamsCollection, userId, year, session, newTaxParam),

  saveUpdatedTaxParams: (userId, year, taxParams) => saveUpdatedTaxParams(taxParamsCollection, userId, year, taxParams),
};

module.exports = taxParamsCollectionServices;
