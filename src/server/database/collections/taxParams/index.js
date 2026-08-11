import { taxParamsCollection } from "../../connections/index.js";
import deleteTaxYears from "./services/deleteTaxYears.js";
import addNewTaxYearToDb from "./services/addNewTaxYear.js";
import getTaxParamsFromDb from "./services/getTaxParamsFromDb.js";
import changeTaxParamsToDb from "./services/changeTaxParamsToDb.js";

var taxParamsCollectionServices = {
  deleteTaxYears: (userId) => deleteTaxYears(taxParamsCollection, userId),

  addNewTaxYearToDb: (userId, year, session) => addNewTaxYearToDb(taxParamsCollection, userId, year, session),

  getTaxParamsFromDb: (userId, year, session) => getTaxParamsFromDb(taxParamsCollection, userId, year, session),

  changeTaxParamsToDb: (userId, session, ...updatedTaxParams) => changeTaxParamsToDb(taxParamsCollection, userId, session, ...updatedTaxParams),
};

export default taxParamsCollectionServices;
