import getTaxParams from "./getTaxParams.js";
import taxRateHandler from "./taxRateHandler.js";
import handleTaxYearSelection from "./handleTaxYearSelection.js";
import insertTaxYearsToSelectElem from "./insertTaxYearsToSelectElem.js";
import insuranceFeePercentageHandler from "./insuranceFeePercentageHandler.js";
import mandatoryInsuranceFeeHandler from "./mandatoryInsuranceFeeHandler.js";

var main = async () => {
  var taxParams = await getTaxParams();

  var { taxRate, insuranceFeePercentage, mandatoryInsuranceFee } = taxParams[0];

  await taxRateHandler(taxRate);
  await insertTaxYearsToSelectElem(taxParams);
  await insuranceFeePercentageHandler(insuranceFeePercentage);
  await mandatoryInsuranceFeeHandler(mandatoryInsuranceFee);

  await handleTaxYearSelection(taxParams);
};

main();
