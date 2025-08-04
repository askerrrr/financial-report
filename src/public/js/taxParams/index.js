import getTaxParams from "./getTaxParams.js";
import taxRateHandler from "./taxRateHandler.js";
import taxYearSelectHandler from "./taxYearSelectHandler.js";
import insuranceFeePercentageHandler from "./insuranceFeePercentageHandler.js";
import mandatoryInsuranceFeeHandler from "./mandatoryInsuranceFeeHandler.js";

var main = async () => {
  var taxParams = await getTaxParams();

  var { taxRate, insuranceFeePercentage, mandatoryInsuranceFee } = taxParams;

  await taxRateHandler(taxRate);
  await taxYearSelectHandler();
  await insuranceFeePercentageHandler(insuranceFeePercentage);
  await mandatoryInsuranceFeeHandler(mandatoryInsuranceFee);
};

main();
