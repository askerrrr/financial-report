import createTaxTable from "./taxTable.js";
import getTaxParams from "./getTaxParams.js";
import taxRateHandler from "./taxRateHandler.js";
import handleTaxYearSelection from "./handleTaxYearSelection.js";
import insertTaxYearsToSelectElem from "./insertTaxYearsToSelectElem.js";
import mandatoryInsuranceFeeHandler from "./mandatoryInsuranceFeeHandler.js";
import insuranceFeePercentageHandler from "./insuranceFeePercentageHandler.js";

var main = async () => {
  var taxParams = await getTaxParams();

  if (taxParams.length == 0) {
    return;
  }

  var { taxRate, insuranceFeePercentage, mandatoryInsuranceFee } = taxParams[0];

  document.getElementById("tax-rate").placeholder =
    "сейчас процент равен " + taxRate;

  document.getElementById("mandatory-insurance-premiums").placeholder =
    "сейчас сумма равна " + mandatoryInsuranceFee + "р.";

  document.getElementById("insurance-fee-percentage").placeholder =
    "сейчас процент равен " + insuranceFeePercentage;

  await createTaxTable(taxParams);

  await taxRateHandler();
  await mandatoryInsuranceFeeHandler();
  await insuranceFeePercentageHandler();
  await handleTaxYearSelection(taxParams);
  await insertTaxYearsToSelectElem(taxParams);
};

main();
