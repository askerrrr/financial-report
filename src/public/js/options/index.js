import getOptions from "./getOptions.js";
import taxRateHandler from "./taxRateHandler.js";
import insuranceFeePercentageHandler from "./insuranceFeePercentageHandler.js";
import mandatoryInsurancePremiumsHandler from "./mandatoryInsurancePremiumsHandler.js";

var main = async () => {
  var options = await getOptions();

  var { taxRate, insuranceFeePercentage, mandatoryInsurancePremiums } = options;

  await taxRateHandler(taxRate);
  await insuranceFeePercentageHandler(insuranceFeePercentage);
  await mandatoryInsurancePremiumsHandler(mandatoryInsurancePremiums);
};

main();
