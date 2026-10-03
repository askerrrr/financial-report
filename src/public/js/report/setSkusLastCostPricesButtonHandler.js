import skusLastCostPriceModal from "./table/services/modal/lastCostPricesModal/index.js";

var button = document.getElementById(
  "set-cost-prices-from-previous-report-period",
);

var setSkusLastCostPricesButtonHandler = (years, skusLastCostPrice) =>
  (button.onclick = () => {
    var hasActiveModal = document.getElementById("modal-window");

    if (hasActiveModal) {
      return;
    }

    if (skusLastCostPrice.length) {
      skusLastCostPriceModal(years, skusLastCostPrice);
    } else {
      alert("Для текущих товаров нет последних себестоимостей.");
    }
  });

export default setSkusLastCostPricesButtonHandler;
