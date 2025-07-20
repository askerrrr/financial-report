import getOptions from "./getOptions.js";
import taxRateHandler from "./taxRateHandler.js";
import mandatoryInsurancePremiumsHandler from "./mandatoryInsurancePremiumsHandler.js";

var main = async () => {
  var options = await getOptions();

  var { taxRate, mandatory_insurance_premiums } = options;

  await taxRateHandler(taxRate);
  await mandatoryInsurancePremiumsHandler(mandatory_insurance_premiums);
};

main();
