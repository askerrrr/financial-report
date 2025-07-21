import getOptions from "./getOptions.js";
import taxRateHandler from "./taxRateHandler.js";
import insuranceFeePercentageHandler from "./insuranceFeePercentageHandler.js";
import mandatoryInsurancePremiumsHandler from "./mandatoryInsurancePremiumsHandler.js";

var main = async () => {
  var options = await getOptions();

  var { taxRate, mandatoryInsurancePremiums } = options;

  await taxRateHandler(taxRate);
  insuranceFeePercentageHandler();
  await mandatoryInsurancePremiumsHandler(mandatoryInsurancePremiums);
};

main();
