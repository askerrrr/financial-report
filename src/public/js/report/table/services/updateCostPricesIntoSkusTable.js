var updateCostPricesIntoSkusTable = (newCostPrices) => {
  for (var { skuName, lastCostPrice } of newCostPrices) {
    var costPriceDisplayElement = document.getElementById("cost-price-" + skuName);
    costPriceDisplayElement.textContent = lastCostPrice;
  }
};

export default updateCostPricesIntoSkusTable;
