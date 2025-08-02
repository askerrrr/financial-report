import getOptions from "./getOptions.js";
import taxRateHandler from "./taxRateHandler.js";
import taxYearSelectHandler from "./taxYearSelectHandler.js";
import insuranceFeePercentageHandler from "./insuranceFeePercentageHandler.js";
import mandatoryInsuranceFeeHandler from "./mandatoryInsuranceFeeHandler.js";

var main = async () => {
  var options = await getOptions();

  var { taxRate, insuranceFeePercentage, mandatoryInsuranceFee } = options;

  await taxRateHandler(taxRate);
  await taxYearSelectHandler()
  await insuranceFeePercentageHandler(insuranceFeePercentage);
  await mandatoryInsuranceFeeHandler(mandatoryInsuranceFee);
};

main();
