var calcAverageRetailPricePerItem = async (data, quantity, itemName) => {
  var items = data.filter((e) => e.sa_name == itemName);

  var allRetailPricesZero = items.every((e) => e.retail_price === 0);

  if (allRetailPricesZero) {
    return 0;
  }

  var retailPrices = items.reduce((acc, e) => acc + e.retail_price, 0);

  var averageRetailPrice = retailPrices / quantity;

  return averageRetailPrice;
};

module.exports = calcAverageRetailPricePerItem;
