import skusLastCostPriceModal from "./table/services/modal/skusLastCostPriceModal.js";

var setSkusLastCostPricesButtonHandler = (skusLastCostPrice) => {
  var button = document.getElementById("set-cost-prices-from-previous-report-period");

  button.addEventListener("click", async () => {
    skusLastCostPriceModal(skusLastCostPrice);

    return;
  });
};

export default setSkusLastCostPricesButtonHandler;
