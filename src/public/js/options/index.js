import getOptions from "./getOptions.js";
import taxRateHandler from "./taxRateHandler.js";

var main = async () => {
  var options = await getOptions();

  var { taxRate } = options;

  await taxRateHandler(taxRate);
};

main();
