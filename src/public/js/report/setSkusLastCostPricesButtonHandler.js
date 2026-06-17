import skusLastCostPriceModal from "./table/services/modal/skusLastCostPriceModal.js";

var button = document.getElementById("set-cost-prices-from-previous-report-period");

var setSkusLastCostPricesButtonHandler = (reportId, taxYear, skusLastCostPrice) => {
  button.onclick = () => {
    if (skusLastCostPrice.length) {
      skusLastCostPriceModal(reportId, taxYear, skusLastCostPrice);
    } else {
      alert("Для текущих товаров нет последних себестоимостей.");
    }
  };
};

export default setSkusLastCostPricesButtonHandler;
