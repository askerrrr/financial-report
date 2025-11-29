import skusLastCostPriceModal from "./table/services/modal/skusLastCostPriceModal.js";

var setSkusLastCostPricesButtonHandler = (reportId, taxYear, skusLastCostPrice) => {
  var button = document.getElementById("set-cost-prices-from-previous-report-period");

  button.onclick = async () => skusLastCostPriceModal(reportId, taxYear, skusLastCostPrice);
};

export default setSkusLastCostPricesButtonHandler;
